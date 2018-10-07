import _ from 'lodash';

const convertIdToName = (itemList, itemId) => {
    const itemObj = _.find(itemList, item => item.id === itemId);
    return itemObj === undefined ? '' : itemObj.data().name;
};

export default convertIdToName;
