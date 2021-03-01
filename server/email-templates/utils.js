import moment from 'moment';
import _ from 'lodash';

const defaultTemplateData = (data) => {

    data = data || {};

    data.locale = data.locale || "en";
    data.site = data.site || '';
    data._ = _;
    data.moment = moment;
    data.copyrightYear = (new Date()).getFullYear();

    return data;

};

export default {
    defaultTemplateData
};