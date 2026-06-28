import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utills/catchAsync";
import { sendResponse } from "../../utills/sendResponse";
import jwt  from 'jsonwebtoken';
import { jwtUtils } from "../../utills/jwt";



// const registerUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const user = await userService.registerUserIntoDB(payload);
//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "User registered successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//      console.log(error);

//      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//        success: false,
//        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//        message: "Failed to register user",
//        error: (error as Error).message,
//      });
//   }
// };
const registerUser =catchAsync(async (req: Request, res: Response,next:NextFunction)=> {
  
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    // res.status(httpStatus.CREATED).json({
    //   success: true,
    //   statusCode: httpStatus.CREATED,
    //   message: "User registered successfully",
    //   data: {
    //     user,
    //   },
    // });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {
          user,
        },
    });
  
});
const getMyProfile=catchAsync(async (req: Request, res: Response,next:NextFunction)=>{

    // const {accessToken}=req.cookies;

    // console.log(req.user,"user request");
    // const verifiedToken=jwtUtils.verifyToken(accessToken,config.jwt_access_secret);

    // if(typeof verifiedToken==="string"){
    //     throw new Error(verifiedToken)
    // }
    const profile=await userService.getMyProfileFromDB(req.user?.id as string)
    // console.log(verifiedToken);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"user profile fetched successfully",
        data:{profile}
    })
})
const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const payload = req.body;

    const updatedProfile = await userService.updateMyProfileInDB(
      userId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully",
      data: { updatedProfile },
    });
  },
);
export const userController={
    registerUser,
    getMyProfile,
    updateMyProfile
}