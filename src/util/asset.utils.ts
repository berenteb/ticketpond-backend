export function prefixBannerImageWithUrl<T extends { bannerImage: string }>(obj: T) {
  return {
    ...obj,
    bannerImage: prefixAssetWithUrl(obj.bannerImage),
  };
}

export function prefixBannerImagesWithUrl<T extends { bannerImage: string }>(arr: T[]) {
  return arr.map(prefixBannerImageWithUrl);
}

export function prefixAssetWithUrl(fileName: string) {
  return `${process.env.ASSET_URL}/${fileName}`;
}
