import {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from "react";
import styles from "./episode-modal.module.scss";
import {Button, Card, FlexContainer, Input, InputWithLabel, Modal, Select} from "@/shared/ui-kit";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from "react-icons/ai";
import {ContentTypeEnum, DataTypeEnum, IEpisode, IPreview} from "@/entities/common";
import {animeApi, IAnime} from "@/entities/anime";
import {ISerial, serialApi} from "@/entities/serial";

interface IProps {
  content: IPreview;
  setContent: Dispatch<SetStateAction<IPreview>>;
  selectedSeason: string | undefined;
  selectedEpisode: string | undefined;
  setSelectedEpisode: Dispatch<SetStateAction<string | undefined>>;
}

interface IError {
  name: string | undefined;
  index: string | undefined;
}

const defaultEpisode: IEpisode = {
  name: "",
  index: 0
}

const defaultError: IError = {
  name: undefined,
  index: undefined,
}

const EpisodeModal: FC<IProps> = (props) => {
  const contentAsAnime = props.content as IAnime;
  const contentAsSerial = props.content as ISerial;

  const [updateSerial] = serialApi.useUpdateSerialMutation();
  const [updateAnime] = animeApi.useUpdateAnimeMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<IError>(defaultError);
  const [episode, setEpisode] = useState<IEpisode>(defaultEpisode);

  useEffect(() => {
    props.setSelectedEpisode(undefined);
  }, [props.selectedSeason]);

  useEffect(() => {
    if (props.selectedEpisode == undefined) {
      setEpisode(defaultEpisode);
      return;
    }

    if (props.content.dataType === DataTypeEnum.serial) {
      const seasonIndex = contentAsSerial.seasons.findIndex(x => x.id == props.selectedSeason);

      if (seasonIndex == -1)
        return;

      setEpisode(contentAsSerial.seasons[seasonIndex].episodes.find(x => x.id == props.selectedEpisode) ?? defaultEpisode);
      return;
    }
    else if (props.content.dataType === DataTypeEnum.anime) {
      setEpisode(contentAsAnime?.episodes?.find(x => x.id == props.selectedEpisode) ?? defaultEpisode);
      return;
    }
  }, [props.selectedSeason, props.selectedEpisode, contentAsSerial]);
  
  const episodesOptions = useMemo(() => {
    if (props.content.contentType != ContentTypeEnum.serial && props.content.contentType != ContentTypeEnum.anime)
      return [];

    if (props.content.dataType == DataTypeEnum.serial) {
      if (contentAsSerial.seasons == undefined)
        return [];

      const index = contentAsSerial.seasons.findIndex(x => x.id == props.selectedSeason);

      if (index == -1)
        return [];

      return contentAsSerial.seasons[index].episodes.map(item => {
        return {label: item.name?.length == 0 ? `${item.index} серія` : item.name!, value: item.id};
      })
    }
    else {
      if (contentAsAnime.episodes == undefined)
        return [];

      return contentAsAnime.episodes.map(item => {
        return {label: item.name?.length == 0 ? `${item.index} серія` : item.name!, value: item.id};
      })
    }
  }, [props.content, props.selectedSeason])

  const openModal = (isDefault: boolean) => {
    if (isDefault) {
      props.setSelectedEpisode(undefined);
      setEpisode(defaultEpisode);
    }

    setError(defaultError);
    setIsOpen(true);
  }

  const saveEpisode = () => {
    setError(() => {
      return defaultError
    });

    if (props.content.dataType == DataTypeEnum.serial) {
      const seasonIndex = contentAsSerial.seasons.findIndex(x => x.id == props.selectedSeason);

      if (seasonIndex == -1)
        return;

      const season = {...contentAsSerial.seasons[seasonIndex]};

      if (episode.name?.trim().length != 0 && season.episodes.find(x => x.name == episode.name && x.id != episode.id) != undefined) {
        setError((prevState) => {
          return {...prevState ,name: "Не унікальне значення"};
        });
        return;
      }

      if (season.episodes.find(x => x.index == episode.index && x.id != episode.id) != undefined) {
        setError((prevState) => {
          return {...prevState ,index: "Не унікальне значення"};
        });
        return;
      }

      const seasons = [...contentAsSerial.seasons];

      if (props.selectedEpisode == undefined) {
        seasons[seasonIndex] = {...season, episodes: [...season.episodes, episode]}
      }
      else {
        const episodeIndex = season.episodes.findIndex(x => x.id == episode.id);

        if (episodeIndex == -1)
          return;

        const episodes = [...seasons[seasonIndex].episodes];
        episodes[episodeIndex] = episode;
        seasons[seasonIndex] = {...season, episodes: episodes}
      }

      updateSerial({id: props.content.id!, data: {...contentAsSerial, seasons: seasons}});
    }
    else {
      if (episode.name?.trim().length != 0 && contentAsAnime.episodes?.find(x => x.name == episode.name && x.id != episode.id) != undefined) {
        setError((prevState) => {
          return {...prevState ,name: "Не унікальне значення"};
        });
        return;
      }

      if (contentAsAnime.episodes?.find(x => x.index == episode.index && x.id != episode.id) != undefined) {
        setError((prevState) => {
          return {...prevState ,index: "Не унікальне значення"};
        });
        return;
      }

      let data: IAnime;

      if (props.selectedEpisode == undefined) {
        data = {...contentAsAnime, episodes: [...contentAsAnime.episodes ?? [], episode]}
      }
      else {
        const episodesIndex = contentAsAnime.episodes!.findIndex(x => x.id == props.selectedEpisode);

        if (episodesIndex == -1)
          return;

        const episodes = [...contentAsAnime.episodes!];
        episodes[episodesIndex] = episode;
        data = {...contentAsAnime, episodes: episodes};
      }

      updateAnime({id: props.content.id!, data: data});
    }

    setIsOpen(false);
  }

  const deleteSeason = () => {
    if (!window.confirm("Видалити"))
      return;

    if (props.content.dataType == DataTypeEnum.serial) {
      const seasons = [...contentAsSerial.seasons];
      const seasonIndex = contentAsSerial.seasons.findIndex(x => x.id == props.selectedSeason);

      if (seasonIndex == -1)
        return;

      const season = seasons[seasonIndex];

      seasons[seasonIndex] = {...season, episodes: season.episodes.filter(x => x.id != props.selectedEpisode)};
      updateSerial({id: props.content.id!, data: {...contentAsSerial, seasons: seasons}});
    }
    else {
      const data = {...contentAsAnime, episodes: contentAsAnime.episodes!.filter(x => x.id != props.selectedEpisode)};
      updateAnime({id: props.content.id!, data: data});
    }

    props.setSelectedEpisode(undefined);
    setEpisode(defaultEpisode);
  }

  return (
    <>
      <FlexContainer className={styles.content}>
        <Select
          placeholder="Серії"
          options={episodesOptions}
          isSearchable
          values={props.selectedEpisode ? [props.selectedEpisode] : []}
          setValues={value => props.setSelectedEpisode(value[0] as string)}
        />
        <Button
          icon={<AiOutlinePlus/>}
          shape="square"
          onClick={() => openModal(true)}
        />
        <Button
          icon={<AiOutlineEdit/>}
          shape="square"
          onClick={() => openModal(false)}
          disabled={props.selectedEpisode == undefined}
        />
        <Button
          icon={<AiOutlineDelete/>}
          shape="square"
          onClick={() => deleteSeason()}
          disabled={props.selectedEpisode == undefined}
        />
      </FlexContainer>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card>
          <InputWithLabel label="Назва">
            <Input
              placeholder="Назва"
              error={error?.name}
              value={episode.name}
              onChange={e => setEpisode({...episode, name: e.target.value})}
            />
          </InputWithLabel>
          <InputWithLabel label="Номер">
            <Input
              placeholder="Номер"
              type="number"
              error={error?.index}
              value={episode.index.toString()}
              onChange={e => setEpisode({...episode, index: parseInt(e.target.value)})}
            />
          </InputWithLabel>
          <div className="">
            <Button text="Зберегти" color="accent" onClick={() => saveEpisode()}/>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default EpisodeModal;