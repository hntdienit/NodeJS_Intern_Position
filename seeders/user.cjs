"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        firstName: "Dien",
        lastName: "Huynh Nguyen Thanh",
        email: "hntdienit@gmail.com",
        // password: Dien123456!
        password: "$2b$05$Il3RQCEAvgRlAq02tDkm/eSyQS1TTtCSIQ6IASpXbbNAeItNOPSOW",
        avatarImage: "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMWFlOTJkMC1hMDYxLWEwNGItYWJhYy0zMjIwMDI5ZjlkNjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkI3NDdFMTkxQ0U3MTFFQTg5NjhDRjNFMDIxRkYwOTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkI3NDdFMTgxQ0U3MTFFQTg5NjhDRjNFMDIxRkYwOTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmU2OWJmNDEtNDRiMy1hZDRjLWE0ZmMtYzVjYTdkODljNjIxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDM3MWE5NDUtMjNmMC1kNTQ2LWEzNzQtN2U1MWNhYjA3MDMwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+r7dqcQAAAT5JREFUeNpi9PcPUmBgYFgCxNYM5IGjQBzDRKEhDFC9S5goNARuGBO6CAcHB4OdnS0DHx8fSSZhGBQSEsRQVFTAkJ2dSZJBLOgCZ86cZdDU1GQ4dOgwZQa9fv2aYdmyFQwfPrxnYGVlZVBTUwOL37p1i8HY2Ijhz5+/DOfPn2f4+/cvfoOsrCwZkpOTGPbt28+wfPlKhtbWJrD4jRs3GTQ01MHsmzdvMVRV1aAYxkSs069fv87Q3t7J8O3bdwZ1dTUGHR1t/IGNCyxevJTh5MlTDFevXgXzJSUlyTPo379/KDQrKwt5BpGcjsgFjMBM+x9ZAJSihYSEGL58+cLw/v17BllZWbD4gwcPwLSYmBgDFxcXw7t37xg+ffqEO/pBksgKYAbAwKtXr2jrNSZoeUIpOAoyKIZCw8AFG0CAAQAgwGj2FCUwugAAAABJRU5ErkJggg==",
        role: "admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
