import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import AllProducts from './AllProducts';
import Shops from './Shops';
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
    <MDBTabs className='mb-3 d-flex justify-content-center align-items-center'>
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

      <MDBTabsContent >
        <MDBTabsPane open={basicActive === 'tab1'}><Shops/></MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}><AllProducts/></MDBTabsPane>
      </MDBTabsContent>
    </>
  )
}

export default UserLanding