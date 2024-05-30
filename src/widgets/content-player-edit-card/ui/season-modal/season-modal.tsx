import {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from "react";
import styles from "./season-modal.module.scss";
import {DataTypeEnum, IPreview} from "@/entities/common";
import {ISeason, ISerial, serialApi} from "@/entities/serial";
import {Button, Card, FlexContainer, Input, InputWithLabel, Modal, Select} from "@/shared/ui-kit";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from "react-icons/ai";

interface IProps {
  content: IPreview;
  setContent: Dispatch<SetStateAction<IPreview>>;
  selectedSeason: string | undefined;
  setSelectedSeason: Dispatch<SetStateAction<string | undefined>>;
}

interface IError {
  name: string | undefined;
  index: string | undefined;
}

const defaultSeason: ISeason = {
  name: "",
  index: 0,
  episodes: []
}

const defaultError: IError = {
  name: undefined,
  index: undefined,
}

const SeasonModal: FC<IProps> = (props) => {
  const contentAsSerial = props.content as ISerial;

  const [updateSerial] = serialApi.useUpdateSerialMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<IError>(defaultError);
  const [season, setSeason] = useState<ISeason>(defaultSeason);

  useEffect(() => {
    if (props.selectedSeason == undefined) {
      setSeason(defaultSeason);
      return;
    }

    setSeason(contentAsSerial.seasons.find(x => x.id == props.selectedSeason)!);
  }, [props.selectedSeason, contentAsSerial]);

  const seasonsOptions = useMemo(() => {
    if (props.content.dataType != DataTypeEnum.serial || contentAsSerial == undefined)
      return [];

    return contentAsSerial.seasons.map(item => {
      return {label: item.name?.length == 0 ? `${item.index} сезон` : item.name!, value: item.id!}
    })
  }, [props.content, contentAsSerial]);

  const openModal = (isDefault: boolean) => {
    if (isDefault) {
      props.setSelectedSeason(undefined);
      setSeason(defaultSeason);
    }

    setError(defaultError);
    setIsOpen(true);
  }

  const saveSeason = () => {
    setError(() => {
      return defaultError
    });

    if (season.name?.trim().length != 0 && contentAsSerial.seasons.find(x => x.name == season.name && x.id != season.id) != undefined) {
      setError((prevState) => {
        return {...prevState ,name: "Не унікальне значення"};
      });
      return;
    }

    if (contentAsSerial.seasons.find(x => x.index == season.index && x.id != season.id) != undefined) {
      setError((prevState) => {
        return {...prevState ,index: "Не унікальне значення"};
      });
      return;
    }

    let data: ISerial;

    if (props.selectedSeason == undefined) {
      data = {...contentAsSerial, seasons: [...contentAsSerial.seasons, season]};
    }
    else {
      const seasonIndex = contentAsSerial.seasons.findIndex(x => x.id == props.selectedSeason);

      if (seasonIndex == -1)
        return;

      const seasons = [...contentAsSerial.seasons];
      seasons[seasonIndex] = season;
      data = {...contentAsSerial, seasons: seasons};
    }

    updateSerial({id: props.content.id!, data: data});
    setIsOpen(false);
  }

  const deleteSeason = () => {
    if (!window.confirm("Видалити"))
      return;

    const data = {...contentAsSerial, seasons: contentAsSerial.seasons.filter(x => x.id != props.selectedSeason)};
    updateSerial({id: props.content.id!, data: data});

    props.setSelectedSeason(undefined);
    setSeason(defaultSeason);
  }

  return (
    <>
      <FlexContainer className={styles.container}>
        <Select
          placeholder="Сезони"
          options={seasonsOptions}
          isSearchable
          values={props.selectedSeason ? [props.selectedSeason] : []}
          setValues={value => props.setSelectedSeason(value[0] as string)}
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
          disabled={props.selectedSeason == undefined}
        />
        <Button
          icon={<AiOutlineDelete/>}
          shape="square"
          onClick={() => deleteSeason()}
          disabled={props.selectedSeason == undefined}
        />
      </FlexContainer>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card>
          <InputWithLabel label="Назва">
            <Input
              placeholder="Назва"
              error={error?.name}
              value={season.name}
              onChange={e => setSeason({...season, name: e.target.value})}
            />
          </InputWithLabel>
          <InputWithLabel label="Номер">
            <Input
              placeholder="Номер"
              type="number"
              error={error?.index}
              value={season.index.toString()}
              onChange={e => setSeason({...season, index: parseInt(e.target.value)})}
            />
          </InputWithLabel>
          <div className="">
            <Button text="Зберегти" color="accent" onClick={() => saveSeason()}/>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default SeasonModal;