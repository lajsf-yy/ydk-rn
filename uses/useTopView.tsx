import React from 'react';
import {TopViewContext} from '../components/topview/TopView';

export const useTopView = () => React.useContext(TopViewContext);
export default TopViewContext;
