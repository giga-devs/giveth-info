import _, { forEach } from 'lodash';
import moment from 'moment'; 

/**
 * 
 * @param obj (object) 
 * @returns (object) object sorted by key
 */

function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
}

/**
 * 
 * @param data (array)
 * @param date_placeholder (string) (createdAt | updatedAt or any other date field), type: string format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
 * @returns donations_by_day
 */


export const countby_day = (data: Array<Object>, date_placeholder: string): Object => {
    const dateName = item => moment(item[date_placeholder]).format('YYYY-MM-DD');
    const count_by_date = _.countBy(data, dateName);
    return sortObj(count_by_date);
};

/**
 * 
 * @param data (array) 
 * @param date_placeholder (string) (createdAt | updatedAt or any other date field), type: string format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
 * @returns donations_by_month
 */
 export const countby_month = (data: Array<Object>, date_placeholder: string): Object => {
    const monthName = item => moment(item[date_placeholder]).format('YYYY-MM');
    const count_by_month = _.countBy(data, monthName);
    return sortObj(count_by_month);
};


/*
* @param data (array)
* @param field (string)
* @returns sum total of field
*/

export const sum_total = (data: Array<Object>, field: string): number => {
    // removing project_id 82 from data for reasons of inconsistency
    return _.sumBy(data, field);
}

/*
* @param data (array)
* @param field (string)
* @returns count of total field
*/

export const count_total = (data: Array<Object>, field: string): number => {
    return _.uniqBy(data, field).length;
}

/*
* @param data (array)
* @returns sum_total_donations_by_user
*/

// return total donations by user.walletAddress
export const sum_total_donations_by_user = (data: Array<Object>): Array<Object> => {
    const data_filtered = data.filter(item => item['user'] && item['valueUsd']);
    // TODO: filtered by user and valueUsd make sense?
    // when filter data by user, the users if address null (users not registered) is not included in the result
    return _(data_filtered).groupBy('user.walletAddress').map((item) => ({
        donorAddress: item[0].user.walletAddress, // item[0].user ? item[0].user.walletAddress : null,
        totalDonated: _.sumBy(item, 'valueUsd'),
        DonationsCount: item.length
      })
      ).orderBy('totalDonated', 'desc').value();
}


/*
* @param data (array)
* @returns sum_total_donations_by_projects
*/

// return total usd by projects
export const sum_total_donations_by_projects = (data: Array<Object>): Array<Object> => {
    const data_filtered = data.filter(item => item['valueUsd']);
    // TODO: filtered by project and valueUsdmake sense?
    // when filter data by user, the users if address null (users not registered) is not included in the result
    return _(data_filtered).groupBy('project.id').map((item) => ({
        projectTitle: item[0].project.title,
        totalDonated: _.sumBy(item, 'valueUsd'),
        DonationsCount: item.length
      })
      ).orderBy('totalDonated', 'desc').value();
}
