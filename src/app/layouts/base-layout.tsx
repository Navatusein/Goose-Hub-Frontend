import {FC} from 'react';
import {Outlet} from 'react-router-dom';

const BaseLayout: FC = () => {
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