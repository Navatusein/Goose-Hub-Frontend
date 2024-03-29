import {FC} from 'react';
import {Outlet} from 'react-router-dom';

const BaseLayout: FC = () => {

  console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      <div>Header</div>
      <div className="container">
        <Outlet/>
      </div>
    </>
  );
};

export default BaseLayout;