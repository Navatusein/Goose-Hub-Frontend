import {FC} from 'react';
import {Button, RangeSlider, SmallButton, CheckboxTag} from "@/shared/ui-kit";
import {AiOutlinePlayCircle} from "react-icons/ai";

const DeveloperPage: FC = () => {
  return (
    <div>
      <Button text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
      <RangeSlider min={1990} max={2024}/>
      <CheckboxTag text="test"/>
      <SmallButton text='Text' styles={{margin: 5}} />
    </div>
  );
};

export default DeveloperPage;