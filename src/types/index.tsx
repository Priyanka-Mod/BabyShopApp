export interface LogInFormError {
    email?: string;
    password?: string;
}

export interface UserDetailType {
    _id:string,
    userData:{
        childBirthDate: Date[],
        childGender: string[],
        childName:string[],
        childPhotoURL:string[],
        displayName:string,
        email:string,
        phoneNumber:string,
        photoURL:string,
        provideerId:string,
        uid:string
    }

}

export interface ProductDetailsType {
    actualPrice:string,
    brand:string,
    discount:string,
    id:string,
    productName:string,
    productPrice:string,
    productUrl:string,
    qty:string,
    size:string,
}