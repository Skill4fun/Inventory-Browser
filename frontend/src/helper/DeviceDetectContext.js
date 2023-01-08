import React, { createContext, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

export const DeviceDetectContext = createContext({});
export const useDeviceDetectContext = () => useContext(DeviceDetectContext);

export default function DeviceDetectContextProvider({ children }) {
  const handleMediaQueryChange = (matches) => matches;
  const devices = {
    isDesktopOrLaptop: useMediaQuery({ minWidth: 1224 }, undefined, handleMediaQueryChange),
    isBigScreen: useMediaQuery({ minWidth: 1824 }),
    isTabletOrMobile: useMediaQuery({ maxWidth: 1224 }, undefined, handleMediaQueryChange),
    isMobile: useMediaQuery({ maxWidth: 760 }, undefined, handleMediaQueryChange),
    isPortrait: useMediaQuery({ orientation: 'portrait' }),
    isRetina: useMediaQuery({ minResolution: '2dppx' }),
  };

  const currentDeviceTypes = Object.keys(devices).filter((key) => devices[key]);

  return (
    <DeviceDetectContext.Provider value={{ currentDeviceTypes }}>
      {children}
    </DeviceDetectContext.Provider>
  );
}
