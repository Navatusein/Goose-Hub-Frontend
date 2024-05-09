import {FC, useEffect, useMemo, useState} from "react";
// import styles from "./franchise-edit-card.module.scss";
import {franchiseApi, IFranchise} from "@/entities/franchise";
import {Button, Card, CardGrid, FlexContainer, Input, InputWithLabel, IOption, Select, TextArea} from "@/shared/ui-kit";
import {ContentCard, previewApi} from "@/entities/common";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

const defaultFranchise: IFranchise = {
  name: "",
  description: "",
}

const FranchiseEditCard: FC = () => {
  const [selectedFranchiseId, setSelectedFranchiseId] = useState<string | undefined>(undefined);
  const [selectedFranchise, setSelectedFranchise] = useState<IFranchise>(defaultFranchise);

  const franchise = franchiseApi.useFetchFranchiseByFilterQuery("");
  const franchiseContent = previewApi.useFetchPreviewByFranchiseIdQuery(selectedFranchiseId!, {skip: selectedFranchiseId == undefined});

  const [createFranchise] = franchiseApi.useCreateFranchiseMutation();
  const [updateFranchise] = franchiseApi.useUpdateFranchiseMutation();
  const [deleteFranchise] = franchiseApi.useDeleteFranchiseMutation();

  useEffect(() => {
    setSelectedFranchise(franchise.data?.find(x => x.id == selectedFranchiseId) ?? defaultFranchise);
  }, [franchise.data, selectedFranchiseId]);

  const franchiseOptions = useMemo(() => {
    if (franchise.data == undefined)
      return [];

    let options: IOption[] = franchise.data.map((item) => {
      return {label: item.name, value: item.id!};
    });

    if (selectedFranchiseId != undefined)
      options = [{label: "Нова франшиза", value: undefined}, ...options];

    return options;
  }, [franchise.data, selectedFranchiseId]);

  const onSave = async () => {
    if (selectedFranchiseId == undefined) {
      const result: {data?: IFranchise, error?: FetchBaseQueryError | SerializedError} = await createFranchise(selectedFranchise);

      if (result.error != undefined)
        return;

      setSelectedFranchiseId(result.data?.id);
    }
    else {
      updateFranchise({id: selectedFranchiseId, data: selectedFranchise});
    }
  }

  const onDelete = () => {
    if (!window.confirm("Видалити"))
      return;

    deleteFranchise(selectedFranchiseId!);
    setSelectedFranchiseId(undefined);
  }

  return (
    <Card>
      {franchise.data != undefined && (
        <InputWithLabel label="Франшиза">
          <Select
            placeholder="Нова франшиза"
            options={franchiseOptions}
            isSearchable
            values={selectedFranchiseId ? [selectedFranchiseId] : []}
            setValues={value => setSelectedFranchiseId(value[0] as string)}
          />
        </InputWithLabel>
      )}
      <InputWithLabel label="Назва">
        <Input
          placeholder="Назва"
          value={selectedFranchise.name}
          onChange={e => setSelectedFranchise({...selectedFranchise, name: e.target.value})}
        />
      </InputWithLabel>
      <InputWithLabel label="Опис">
        <TextArea
          placeholder="Опис"
          value={selectedFranchise.description}
          rows={4}
          onChange={e => setSelectedFranchise({...selectedFranchise, description: e.target.value})}
        />
      </InputWithLabel>
      <FlexContainer>
        <Button
          color="accent"
          text="Зберегти"
          onClick={onSave}
        />
        <Button
          color="danger"
          text="Видалити"
          onClick={onDelete}
          disabled={selectedFranchiseId == undefined}
        />
      </FlexContainer>
      <InputWithLabel label="Контент">
        <CardGrid>
          {franchiseContent.data?.map(item => (
            <ContentCard content={item} key={item.id}/>
          ))}
        </CardGrid>
      </InputWithLabel>
    </Card>
  );
};

export default FranchiseEditCard;