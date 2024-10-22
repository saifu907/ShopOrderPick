import React, { useState, lazy, Suspense } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

const AllProducts = lazy(() => import('./AllProducts'));
const Shops = lazy(() => import('./Shops'));

function UserLanding() {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  return (
    <>
      <MDBTabs className='d-flex justify-content-center align-items-center'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Shops
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Explore
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <Suspense fallback={<div>Loading...</div>}>
          {basicActive === 'tab1' && (
            <MDBTabsPane open={basicActive === 'tab1'}>
              <Shops />
            </MDBTabsPane>
          )}
          {basicActive === 'tab2' && (
            <MDBTabsPane open={basicActive === 'tab2'}>
              <AllProducts />
            </MDBTabsPane>
          )}
        </Suspense>
      </MDBTabsContent>
    </>
  );
}

export default UserLanding;
