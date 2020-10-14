import FormLayout from './form-layout';
import ListLayout from './list-layout';
import PictureUploader from './picture-uploader';
import ItemBox from './item-box';
import PickerArea from './picker-area';
import { buildSelectionBase } from './selection-base';
import SelectionOrg from './selection-org';
import SelectionAddress from './selection-address';

export default {
  install(Vue) {
    Vue.component(ListLayout.name, ListLayout);
    Vue.component(FormLayout.name, FormLayout);
    Vue.component(PictureUploader.name, PictureUploader);
    Vue.component(ItemBox.name, ItemBox);

    Vue.component(PickerArea.name, PickerArea);

    const SelectionBase = buildSelectionBase();
    Vue.component(SelectionBase.name, SelectionBase);
    Vue.component(SelectionOrg.name, SelectionOrg);
    Vue.component(SelectionAddress.name, SelectionAddress);
  },
};
