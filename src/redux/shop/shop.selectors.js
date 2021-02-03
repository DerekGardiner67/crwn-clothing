import {createSelector} from 'reselect';


const selectShop = state => state.shop;

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womends: 4,
    mens: 5
}

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
);

export const selectCollectionNotWorking = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections.find(
        collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
);


export const selectCollectionWorkingFixed = collectionUrlParam =>
  createSelector([selectCollections], collections => {
    return collections.find(collection => {
      return collection.routeName === collectionUrlParam
    })
  });