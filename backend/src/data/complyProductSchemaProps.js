export const complyProductSchemaProps = (reqProduct) => {
  const compliedSchema = {
    factoryProductId: reqProduct.TwrCode,
    eanCode: reqProduct.TwrEan,
    brand: reqProduct.Brand,
    nameEn: reqProduct.NameEN.__cdata,
    namePl: reqProduct.NamePL.__cdata,
    descEn: reqProduct.DescEN.__cdata,
    descPl: reqProduct.DescPL.__cdata,
    weightKgBr: Number(reqProduct.WeightG.replace(/,/g, '.')) || 0,
    weightKgNet: Number(reqProduct.WeightN.replace(/,/g, '.')) || 0,
    unit: reqProduct.TwrUnit,
    qtyAllStock: Number(reqProduct.Q_A.replace(/,/g, '.')) || 0,
    qtyReserved: Number(reqProduct.Q_R.replace(/,/g, '.')) || 0,
    qtyAvailable: (Number(reqProduct.Q_A.replace(/,/g, '.')) - Number(reqProduct.Q_R.replace(/,/g, '.'))) || 0,
    priceExpEur: Number(reqProduct.PriceExpEUR.replace(/,/g, '.')) || 0,
    photoUrl: reqProduct.Photo,
    lastUpdated: new Date(),
  };
  return compliedSchema;
};
