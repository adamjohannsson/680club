const setEntityFromDataLayerInto = async ({ getEntityMethod, setEntity }) => {
  const entityFromDataLayer = await getEntityMethod();

  setEntity(entityFromDataLayer);
};

export { setEntityFromDataLayerInto };
