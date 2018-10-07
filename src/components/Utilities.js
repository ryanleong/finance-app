import _ from 'lodash';

const convertIdToName = (itemList, itemId) => {
    const itemObj = _.find(itemList, (item, id) => id === itemId);
    return itemObj === undefined ? '' : itemObj.name;
};

export default convertIdToName;
