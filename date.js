// const date = new Date();
// const options = {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     timeZone: 'Asia/Bangkok', // specify the time zone
// };

// const formattedDate = date.toLocaleString('en-US', options).replace(/[/: ]/g, '_');
// const fileName = `data_${formattedDate.split(',')[0]}.xlsx`;

// console.log(fileName);

// // Input date string
// const inputDateString = "29/12/2023 13:21:47";

// // Split the input date string using the '/' separator
// const parts = inputDateString.split('/');

// // Rearrange the date parts and join them with '-'
// const formattedDateString = parts[0] + '-' + parts[1] + '-' + parts[2];

// // Resulting formatted date string
// console.log(formattedDateString);

// Input date string
const inputDateString = "29/12/2023 13:21:47";

// Replace '/' with '-'
const formattedDateString = inputDateString.replace(/\//g, '-');

// Resulting formatted date string
console.log(formattedDateString);