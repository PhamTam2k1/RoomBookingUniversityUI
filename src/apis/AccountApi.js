import BaseAPIConfig from "./BaseApiConfig";

class AccountAPI {
    controller = "Accounts";
   
    /**
    * Mô tả : Lấy toàn bộ dữ liệu phòng ban từ api
    * @Createdby: PTTAM
    * Created date: 21:33 1/09/2022
    */
    async logIn(user) {
        return await BaseAPIConfig.post(`${this.controller}/login`,user);
    }
    async logOut() {
        return await BaseAPIConfig.post(`${this.controller}/logout`);
    }


}
export default new  AccountAPI();
// await UserApi.getUserByID(userID).then(
//     (res) => {
//       currentThis.userRoles = res.data.UserRoles;
//       currentThis.user = res.data;
//       currentThis.isShowLoading = false;
//       currentThis.bindingArrayRole();
//     },
//     (err) => {
//       console.log(err);
//       this.isShowLoading = false;
//     }
//   );