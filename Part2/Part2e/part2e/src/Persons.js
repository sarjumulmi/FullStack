import React, {Fragment} from 'react';

const Persons = ({personsToDisplay}) => (
  <Fragment>{personsToDisplay()}</Fragment>
  
) 

export default Persons