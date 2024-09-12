// API的统一导出口

import scms from "./scms";
import pushMessage from "./push-message";
import locationManagement from "./rzdn/location-management";
import agency from "./rzdn/agency";

export default {
    scms,
    pushMessage,
    locationManagement,
    agency
}