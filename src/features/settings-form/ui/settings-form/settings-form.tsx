import {CSSProperties, FC, ReactNode} from "react";
import styles from "./settings-form.module.scss";
import {Button, FlexContainer, TextWithLabel} from "@/shared/ui-kit";

interface IProps {
  styles?: CSSProperties;
  className?: string;
  name: string
  icon: ReactNode;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
  children: ReactNode;
}

const SettingsForm: FC<IProps> = (props) => {

  return (
    <FlexContainer vertical className={`${styles.userSettingsForm} ${props.className}`} styles={props.styles}>
      <FlexContainer align="center" justify="space-between">
        <TextWithLabel icon={props.icon} text={props.name}/>
        {props.isEdit && (
          <FlexContainer>
            <Button
              onClick={() => props.onSave()}
              color="accent"
              text="Зберегти"/>
            <Button
              onClick={() => props.onCancel()}
              text="Відмінити"/>
          </FlexContainer>
        )}
        {!props.isEdit && (
          <Button onClick={() => props.setIsEdit(true)} text="Редагувати"/>
        )}
      </FlexContainer>
      <div className={styles.form}>
        {props.children}
      </div>
    </FlexContainer>
  );
};

export default SettingsForm;