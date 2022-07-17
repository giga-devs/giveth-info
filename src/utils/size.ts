export const deviceSize = {
	mobileS: 320,
	mobileM: 375,
	mobileL: 425,
	tablet: 768,
	laptop: 1024,
	laptopL: 1280,
	desktop: 1440,
	desktopL: 1770,
};

export const device = {
	mobileS: `(min-width: ${deviceSize.mobileS}px)`,
	mobileM: `(min-width: ${deviceSize.mobileM}px)`,
	mobileL: `(min-width: ${deviceSize.mobileL}px)`,
	tablet: `(min-width: ${deviceSize.tablet}px)`,
	laptop: `(min-width: ${deviceSize.laptop}px)`,
	laptopL: `(min-width: ${deviceSize.laptopL}px)`,
	desktop: `(min-width: ${deviceSize.desktop}px)`,
	desktopL: `(min-width: ${deviceSize.desktopL}px)`,
};

export const mediaQueries = {
	mobileS: `@media (min-width: ${deviceSize.mobileS}px)`,
	mobileM: `@media (min-width: ${deviceSize.mobileM}px)`,
	mobileL: `@media (min-width: ${deviceSize.mobileL}px)`,
	tablet: `@media (min-width: ${deviceSize.tablet}px)`,
	laptop: `@media (min-width: ${deviceSize.laptop}px)`,
	laptopL: `@media (min-width: ${deviceSize.laptopL}px)`,
	desktop: `@media (min-width: ${deviceSize.desktop}px)`,
	desktopL: `@media (min-width: ${deviceSize.desktopL}px)`,
};