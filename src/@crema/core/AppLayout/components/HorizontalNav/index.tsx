import React from 'react';
import HorizontalGroup from './HorizontalGroup';
import HorizontalCollapse from './HorizontalCollapse';
import HorizontalItem from './HorizontalItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import routesConfig, { RouterConfigData } from '../../../../../pages/routesConfig';
import HasRole from 'shared/helpers/keycloak/HasRole';

const HorizontalNav = () => {
  return (
    <List className="navbarNav">
      {routesConfig.map((item: RouterConfigData) => (
        <HasRole {...item.role} key={item.id}>
          <React.Fragment>
            {item.type === 'group' && <HorizontalGroup item={item} nestedLevel={0} />}

            {item.type === 'collapse' && <HorizontalCollapse item={item} nestedLevel={0} />}

            {item.type === 'item' && <HorizontalItem item={item} nestedLevel={0} />}

            {item.type === 'divider' && <Divider sx={{ my: 5 }} />}
          </React.Fragment>
        </HasRole>
      ))}
    </List>
  );
};

export default HorizontalNav;
