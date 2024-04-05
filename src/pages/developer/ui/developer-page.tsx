import {FC} from 'react';
import {Button, RangeSlider} from "@/shared/ui-kit";
import {AiOutlinePlayCircle} from "react-icons/ai";
import CheckboxTag from "../../../shared/ui-kit/checkbox-tag/checkbox-tag.tsx";

const DeveloperPage: FC = () => {
  return (
    <div>
      <Button text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
      <RangeSlider min={1990} max={2024}/>
      <CheckboxTag text="test"/>
    </div>
  );
};

export default DeveloperPage;