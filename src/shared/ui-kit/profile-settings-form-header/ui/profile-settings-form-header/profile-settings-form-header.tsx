import {CSSProperties, FC, MouseEventHandler, ReactNode, useState} from 'react';
import {Button, FlexContainer, TextWithLabel} from "@/shared/ui-kit";


interface IProps {
  styles?: CSSProperties;
  className?: string;
  edit?: boolean;
  name: string
  icon: ReactNode;
  OnClick?: MouseEventHandler;
  onActive: () => void;
}

const ProfileSettingsFormHeader:FC<IProps> = (props) => {
  const [active, setActive] = useState<boolean>(props.edit!);
  return (
    <FlexContainer align="center" justify="space-between">
      <TextWithLabel icon={props.icon} text={props.name} />
      {!active ? (
        <Button onClick={() => {setActive(true); props.onActive()}} text="Редагувати" />
      ) : (
        <>
          <FlexContainer>
            <Button onClick={props.OnClick} color="accent" text="Зберегти" />
            <Button onClick={() => {setActive(false); props.onActive()}} text="Відмінити" />
          </FlexContainer>
        </>
      )}
    </FlexContainer>
  );
};

export default ProfileSettingsFormHeader;