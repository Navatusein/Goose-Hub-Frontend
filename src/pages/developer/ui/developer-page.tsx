import {FC} from 'react';
import {Button, RangeSlider} from "@/shared/ui-kit";
import {AiOutlinePlayCircle} from "react-icons/ai";

const DeveloperPage: FC = () => {
  return (
    <div>
      <Button text="Дивитися" icon={<AiOutlinePlayCircle/>}/>
      <RangeSlider min={1990} max={2024}/>
    </div>
  );
};

export default DeveloperPage;