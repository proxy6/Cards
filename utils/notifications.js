const res = require("express/lib/response");
const nodemailer = require("nodemailer");
const {Notification} = require('../models/notification.model')
var gcm = require("node-gcm");
module.exports = {
  //Phone Notification That Saves in the DataBAse
  phoneAndPushNotification: async (data) => {
    try {
        const notification = await Notification.create({
            title: data.title,
            message: data.message,
            user_id: data.user_id
        });
        
        const sender = new gcm.Sender(process.env.FCMKEY);
        const message = new gcm.Message({
            data: { key1: "msg1" },
            notification: {
                title: `${data.title}`,
                body: `${data.message}`,
            },
        });

        const regTokens = [data.ptoken];
        return new Promise((resolve, reject) => {
            sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                if (err) {
                    return reject(err);
                }
                console.log('push notification sent')
                return resolve(response);
            });
        });
    } catch(e) {
        Promise.reject(err);
    }
   
  },
  emailNotification: (data, callBack) => {
    // let query = User.findOne({email: email})
    // .then(results=>{
        const output = `
    <html>
    <body>
    <style id='media-query' type='text/css'>
        @media (max-width: 685px) {
            .block-grid,
            .col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }
         
            .col {
                width: 100% !important;
            }
            .col>div {
                margin: 0 auto;
            }
            img.fullwidth,
            img.fullwidthOnMobile {
                max-width: 100% !important;
            }

            .no-stack .col {
                min-width: 0 !important;
                display: table-cell !important;
            }

            .no-stack.two-up .col {
                width: 50% !important;
            }

            .no-stack .col.num4 {
                width: 33% !important;
            }

            .no-stack .col.num8 {
                width: 66% !important;
            }

            .no-stack .col.num4 {
                width: 33% !important;
            }

            .no-stack .col.num3 {
                width: 25% !important;
            }

            .no-stack .col.num6 {
                width: 50% !important;
            }

            .no-stack .col.num9 {
                width: 75% !important;
            }

            .video-block {
                max-width: none !important;
            }

            .mobile_hide {
                min-height: 0px;
                max-height: 0px;
                max-width: 0px;
                display: none;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide {
                display: block !important;
                max-height: none !important;
            }

            .bgman {
                /* The image used */
            
                /* Full height */
                height: 100%;
                /* Center and scale the image nicely */
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;

            }
    </style>


    <!--[if IE]><div class='ie-browser'><![endif]-->
    <table background-color='#f3f2f3' cellpadding='0' cellspacing='0' class='nl-container' role='presentation'
        style='table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3f2f3; width: 100%;'
        valign='top' width='100%'>
        <tbody>
            <tr style='vertical-align: top;' valign='top'>
                <td style='word-break: break-word; vertical-align: top;' valign='top'>
                    <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='center' style='background-color:#f3f2f3'><![endif]-->
                    <div style='background-color:transparent;'>
                        <div class='block-grid'
                            style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;'>
                            <div style='border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;'>
                                <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:transparent;'><tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:665px'><tr class='layout-full-width' style='background-color:#ffffff'><![endif]-->
                                <!--[if (mso)|(IE)]><td align='center' width='665' style='background-color:#ffffff;width:665px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                                <div class='col num12'
                                    style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                    <div style='width:100% !important;'>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                            <!--<![endif]-->
                                            <div class='mobile_hide'>
                                                <table border='0' cellpadding='0' cellspacing='0' class='divider'
                                                    role='presentation'
                                                    style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                    valign='top' width='100%'>
                                                    <tbody>
                                                        <tr style='vertical-align: top;' valign='top'>
                                                            <td class='divider_inner'
                                                                style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;'
                                                                valign='top'>
                                                                <table align='center' border='0' cellpadding='0'
                                                                    cellspacing='0' class='divider_content'
                                                                    role='presentation'
                                                                    style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 30px solid #F3F2F3; width: 100%;'
                                                                    valign='top' width='100%'>
                                                                    <tbody>
                                                                        <tr style='vertical-align: top;' valign='top'>
                                                                            <td style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                                valign='top'><span></span></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div style='background-color:transparent;'>
                        <div class='block-grid three-up'
                            style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;'>
                            <div style='border-collapse: collapse;display: none;width: 100%;background-color:#ffffff;'>

                                <div class='col num4'
                                    style='max-width: 320px; min-width: 221px; display: table-cell; vertical-align: top; width: 221px;'>
                                    <div style='width:100% !important;'>


                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:33px; padding-bottom:0px; padding-right: 0px; padding-left: 48px;'>

                                            <div align='right' class='img-container left autowidth'
                                                style='padding-right: 0px;padding-left: 0px;'>

                                                <a href='https://savests.com/' style='outline:none' tabindex='-1'
                                                    target='_blank'>


                                                </a>

                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td><td align='center' width='221' style='background-color:#ffffff;width:221px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                                <div class='col num4'
                                    style='max-width: 320px; min-width: 221px; display: table-cell; vertical-align: top; width: 221px;'>
                                    <div style='width:100% !important;'>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                            <!--<![endif]-->
                                            <div></div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td><td align='center' width='221' style='background-color:#ffffff;width:221px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 48px; padding-top:5px; padding-bottom:5px;'><![endif]-->
                                <div class='col num4'
                                    style='max-width: 320px; min-width: 221px; display: table-cell; vertical-align: top; width: 221px;'>
                                    <div style='width:100% !important;'>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 48px;'>
                                            <!--<![endif]-->
                                            <div class='mobile_hide'>
                                                <table borde='0' cellpadding='0' cellspacing='0' class='divider'
                                                    role='presentation'
                                                    style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                    valign='top' width='100%'>
                                                    <tbody>
                                                        <tr style='vertical-align: top;' valign='top'>
                                                            <td class='divider_inner'
                                                                style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;'
                                                                valign='top'>
                                                                <table alig='center' borde='0' cellpadding='0'
                                                                    cellspacing='0' class='divider_content'
                                                                    role='presentation'
                                                                    style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;'
                                                                    valign='top' width='100%'>
                                                                    <tbody>
                                                                        <tr style='vertical-align: top;' valign='top'>
                                                                            <td style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                                valign='top'><span></span></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div alig='center' class='button-container'
                                                style='padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;'>
                                                <!--[if mso]>
<table width='100%' cellpadding='0' cellspacing='0' border='0' style='border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;'><tr><td style='padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px' align='center'><v:roundrect xmlns:v='urn:schemas-microsoft-com:vml' xmlns:w='urn:schemas-microsoft-com:office:word' href='https://savests.com/dash/user/index.php' style='height:31.5pt; width:92.25pt; v-text-anchor:middle;' arcsize='10%' stroke='false' fillcolor='#ff7d33'><w:anchorlock/><v:textbox inset='0,0,0,0'>
<center style='color:#ffffff; font-family:Arial, sans-serif; font-size:16px'><![endif]-->


                                            </div>

                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div style='background-color:transparent;'>
                        <div class='block-grid'
                            style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f3f2f3;'>
                            <div style='border-collapse: collapse;display: table;width: 100%;background-color:#f3f2f3;'>


                                <div class='col num12'
                                    style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                    <div style='width:100% !important;'>

                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>


                                            <table border='0' cellpadding='0' cellspacing='0' class='divider'
                                                role='presentation'
                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                valign='top' width='100%'>
                                                <tbody>
                                                    <tr style='vertical-align: top;' valign='top'>
                                                        <td class='divider_inner'
                                                            style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;'
                                                            valign='top'>
                                                            <table align='center' border='0' cellpadding='0'
                                                                cellspacing='0' class='divider_content' height='1'
                                                                role='presentation'
                                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid transparent; height: 1px; width: 100%;'
                                                                valign='top' width='100%'>
                                                                <tbody>
                                                                    <tr style='vertical-align: top;' valign='top'>
                                                                        <td height='1'
                                                                            style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                            valign='top'><span></span></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div>
                        <div class='block-grid'
                            style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff; background-image: linear-gradient(#fffffe,#f8fffc);'>

                            <div>

                                <div class='col num12'
                                    style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>

                                    <div style='width:100% !important;'>

                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:60px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>

                                            <div align='center' class='img-container center autowidth'
                                                style='padding-right: 0px;padding-left: 0px;'>




                                            </div>

                                            <div
                                                style='color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:20px;padding-right:38px;padding-bottom:10px;padding-left:38px;'>
                                                <div
                                                    style='line-height: 1.2; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 14px;'>
                                                    <p
                                                        style='font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 17px; margin: 0;'>
                                                        <span style='color: #000000;'><span
                                                                style='font-size: 22px;'><strong><span
                                                                        style='color: #0bb481;'><span
                                                                            style='color: #003066;'>Afri</span>PayX</span> ${data.title}</strong></span></span>
                                                    </p>
                                                </div>
                                            </div>


                                            <div
                                                style='color:#000e62;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:0px;padding-right:0px;padding-bottom:10px;padding-left:0px;'>
                                                <div
                                                    style='line-height: 1.2; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #000e62; mso-line-height-alt: 14px;'>
                                                    <p
                                                        style='font-size: 16px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 19px; margin: 0;'>
                                                        <span style='color: #003366;'><strong> ${data.message}</strong></span>
                                                    </p>
                                                </div>
                                            </div>


                                            <div
                                                style='color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:38px;padding-bottom:30px;padding-left:38px;'>
                                                <div
                                                    style='line-height: 1.5; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 18px;'>
                                                </div>
                                            </div>
                                            <div align='center' class='img-container center autowidth'
                                                style='padding-right: 0px;padding-left: 0px;'>

                                                <table>
                                                  
                                                </table>
                                                <br>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div style='background-color:transparent;'>
                        <div class='block-grid mixed-two-up'
                            style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;'>
                            <div style='border-collapse: collapse;display: table;width: 100%;background-color:#31ad64;'>


                                <div class='col num8'
                                    style='display: table-cell; vertical-align: top; min-width: 320px; max-width: 440px; width: 443px;'>
                                    <div style='width:100% !important;'>

                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>


                                            <div
                                                style='color:#ffffff;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;'>
                                                <div
                                                    style='font-size: 14px; line-height: 1.2; color: #ffffff; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 17px;'>
                                                    <p
                                                        style='font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;'>
                                                        Powered by TAJIRI PROJECT</p>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>


                                <div class='col num4'
                                    style='display: table-cell; vertical-align: top; max-width: 320px; min-width: 220px; width: 221px;'>
                                    <div style='width:100% !important;'>

                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>


                                            <div
                                                style='color:#ffffff;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.5;padding-top:0px;padding-right:48px;padding-bottom:28px;padding-left:0px;'>
                                                <div
                                                    style='line-height: 1.5; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #ffffff; mso-line-height-alt: 18px;'>
                                                    <br>
                                                    <p
                                                        style='font-size: 14px; line-height: 1.5; word-break: break-word; text-align: left; font-family: inherit; mso-line-height-alt: 21px; margin: 0;'>
                                                    </p>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div style='background-color:transparent;'>
                        <div class='block-grid'
                            style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f3f2f3;'>
                            <div style='border-collapse: collapse;display: table;width: 100%;background-color:#f3f2f3;'>
                                <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:transparent;'><tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:665px'><tr class='layout-full-width' style='background-color:#f3f2f3'><![endif]-->
                                <!--[if (mso)|(IE)]><td align='center' width='665' style='background-color:#f3f2f3;width:665px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                                <div class='col num12'
                                    style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                    <div style='width:100% !important;'>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                            <!--<![endif]-->
                                            <table border='0' cellpadding='0' cellspacing='0' class='divider'
                                                role='presentation'
                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                valign='top' width='100%'>
                                                <tbody>
                                                    <tr style='vertical-align: top;' valign='top'>
                                                        <td class='divider_inner'
                                                            style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;'
                                                            valign='top'>
                                                            <table align='center' border='0' cellpadding='0'
                                                                cellspacing='0' class='divider_content' height='1'
                                                                role='presentation'
                                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid transparent; height: 1px; width: 100%;'
                                                                valign='top' width='100%'>
                                                                <tbody>
                                                                    <tr style='vertical-align: top;' valign='top'>
                                                                        <td height='1'
                                                                            style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                            valign='top'><span></span></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style='background-color:transparent;'>
                        <div class='block-grid'
                            style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f3f2f3;'>
                            <div style='border-collapse: collapse;display: table;width: 100%;background-color:#f3f2f3;'>
                                <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:transparent;'><tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:665px'><tr class='layout-full-width' style='background-color:#f3f2f3'><![endif]-->
                                <!--[if (mso)|(IE)]><td align='center' width='665' style='background-color:#f3f2f3;width:665px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                                <div class='col num12'
                                    style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                    <div style='width:100% !important;'>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                            <!--<![endif]-->
                                            <div class='mobile_hide'>
                                                <table border='0' cellpadding='0' cellspacing='0' class='divider'
                                                    role='presentation'
                                                    style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                    valign='top' width='100%'>
                                                    <tbody>
                                                        <tr style='vertical-align: top;' valign='top'>
                                                            <td class='divider_inner'
                                                                style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px;'
                                                                valign='top'>
                                                                <table align='center' border='0' cellpadding='0'
                                                                    cellspacing='0' class='divider_content'
                                                                    role='presentation'
                                                                    style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;'
                                                                    valign='top' width='100%'>
                                                                    <tbody>
                                                                        <tr style='vertical-align: top;' valign='top'>
                                                                            <td style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                                valign='top'><span></span></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>`;
        // html body

        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        transporter.verify((err, success) => {
          if (err) {
            console.log(err);
          }
          console.log("server is ready to receive message " + success);
        });
        transporter.sendMail(
          {
            from: '"Bix Card" <testemail@gmail.com>',
            to: `${data.email}`,
            subject: `${data.title}`,
            html: output, // html body
          },

          
          function (err, info) {
            if (err) {
              return callBack(err);
            }
            console.log("message sent: %s", info.messageId);
            return callBack("Email Sent");
          }
        );
    //   }
    // );
  },
  //Phone Notification That Doesnt Save in Database
  pushNotification: (data, callBack) => {
    //collect data.title data.body
    pool.query(
      `SELECT * FROM users WHERE id = ? `,
      [data.user_id],
      (error, results, fields) => {
        if (error) {
          return error;
        }
        let receiverstoken = results[0].phonetoken;
        var gcm = require("node-gcm");
        var sender = new gcm.Sender(process.env.FCMKEY);
        var message = new gcm.Message({
          data: { key1: "msg1" },
          notification: {
            title: `${data.title}`,
            body: `${data.message}`,
          },
        });
        var regTokens = [receiverstoken];
        sender.send(
          message,
          { registrationTokens: regTokens },
          function (err, response) {
            if (err) {
              console.error(err);
            }
            return callBack(null, response);

            // return response;
          }
        );
        ////End Notification Here//
      }
    );
  },
  //Email Notification for forget password
  passwordEmailNotification: (data, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE email = ? `,
      [data.email],
      (error, results, fields) => {
        if (error) {
          return error;
        }
        const output = `
<html>
<body>
<style id='media-query' type='text/css'>
    @media (max-width: 685px) {
        .block-grid,
        .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
        }
     
        .col {
            width: 100% !important;
        }
        .col>div {
            margin: 0 auto;
        }
        img.fullwidth,
        img.fullwidthOnMobile {
            max-width: 100% !important;
        }

        .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
        }

        .no-stack.two-up .col {
            width: 50% !important;
        }

        .no-stack .col.num4 {
            width: 33% !important;
        }

        .no-stack .col.num8 {
            width: 66% !important;
        }

        .no-stack .col.num4 {
            width: 33% !important;
        }

        .no-stack .col.num3 {
            width: 25% !important;
        }

        .no-stack .col.num6 {
            width: 50% !important;
        }

        .no-stack .col.num9 {
            width: 75% !important;
        }

        .video-block {
            max-width: none !important;
        }

        .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
        }

        .desktop_hide {
            display: block !important;
            max-height: none !important;
        }

        .bgman {
            /* The image used */
        
            /* Full height */
            height: 100%;
            /* Center and scale the image nicely */
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;

        }
</style>


<!--[if IE]><div class='ie-browser'><![endif]-->
<table background-color='#f3f2f3' cellpadding='0' cellspacing='0' class='nl-container' role='presentation'
    style='table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3f2f3; width: 100%;'
    valign='top' width='100%'>
    <tbody>
        <tr style='vertical-align: top;' valign='top'>
            <td style='word-break: break-word; vertical-align: top;' valign='top'>
                <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='center' style='background-color:#f3f2f3'><![endif]-->
                <div style='background-color:transparent;'>
                    <div class='block-grid'
                        style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;'>
                        <div style='border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;'>
                            <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:transparent;'><tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:665px'><tr class='layout-full-width' style='background-color:#ffffff'><![endif]-->
                            <!--[if (mso)|(IE)]><td align='center' width='665' style='background-color:#ffffff;width:665px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                            <div class='col num12'
                                style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                <div style='width:100% !important;'>
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                        <!--<![endif]-->
                                        <div class='mobile_hide'>
                                            <table border='0' cellpadding='0' cellspacing='0' class='divider'
                                                role='presentation'
                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                valign='top' width='100%'>
                                                <tbody>
                                                    <tr style='vertical-align: top;' valign='top'>
                                                        <td class='divider_inner'
                                                            style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;'
                                                            valign='top'>
                                                            <table align='center' border='0' cellpadding='0'
                                                                cellspacing='0' class='divider_content'
                                                                role='presentation'
                                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 30px solid #F3F2F3; width: 100%;'
                                                                valign='top' width='100%'>
                                                                <tbody>
                                                                    <tr style='vertical-align: top;' valign='top'>
                                                                        <td style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                            valign='top'><span></span></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div style='background-color:transparent;'>
                    <div class='block-grid three-up'
                        style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;'>
                        <div style='border-collapse: collapse;display: none;width: 100%;background-color:#ffffff;'>

                            <div class='col num4'
                                style='max-width: 320px; min-width: 221px; display: table-cell; vertical-align: top; width: 221px;'>
                                <div style='width:100% !important;'>


                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:33px; padding-bottom:0px; padding-right: 0px; padding-left: 48px;'>

                                        <div align='right' class='img-container left autowidth'
                                            style='padding-right: 0px;padding-left: 0px;'>

                                            <a href='https://savests.com/' style='outline:none' tabindex='-1'
                                                target='_blank'>


                                            </a>

                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </div>
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td><td align='center' width='221' style='background-color:#ffffff;width:221px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                            <div class='col num4'
                                style='max-width: 320px; min-width: 221px; display: table-cell; vertical-align: top; width: 221px;'>
                                <div style='width:100% !important;'>
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                        <!--<![endif]-->
                                        <div></div>
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td><td align='center' width='221' style='background-color:#ffffff;width:221px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 48px; padding-top:5px; padding-bottom:5px;'><![endif]-->
                            <div class='col num4'
                                style='max-width: 320px; min-width: 221px; display: table-cell; vertical-align: top; width: 221px;'>
                                <div style='width:100% !important;'>
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 48px;'>
                                        <!--<![endif]-->
                                        <div class='mobile_hide'>
                                            <table borde='0' cellpadding='0' cellspacing='0' class='divider'
                                                role='presentation'
                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                valign='top' width='100%'>
                                                <tbody>
                                                    <tr style='vertical-align: top;' valign='top'>
                                                        <td class='divider_inner'
                                                            style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;'
                                                            valign='top'>
                                                            <table alig='center' borde='0' cellpadding='0'
                                                                cellspacing='0' class='divider_content'
                                                                role='presentation'
                                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;'
                                                                valign='top' width='100%'>
                                                                <tbody>
                                                                    <tr style='vertical-align: top;' valign='top'>
                                                                        <td style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                            valign='top'><span></span></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div alig='center' class='button-container'
                                            style='padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;'>
                                            <!--[if mso]>
<table width='100%' cellpadding='0' cellspacing='0' border='0' style='border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;'><tr><td style='padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px' align='center'><v:roundrect xmlns:v='urn:schemas-microsoft-com:vml' xmlns:w='urn:schemas-microsoft-com:office:word' href='https://savests.com/dash/user/index.php' style='height:31.5pt; width:92.25pt; v-text-anchor:middle;' arcsize='10%' stroke='false' fillcolor='#ff7d33'><w:anchorlock/><v:textbox inset='0,0,0,0'>
<center style='color:#ffffff; font-family:Arial, sans-serif; font-size:16px'><![endif]-->


                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div style='background-color:transparent;'>
                    <div class='block-grid'
                        style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f3f2f3;'>
                        <div style='border-collapse: collapse;display: table;width: 100%;background-color:#f3f2f3;'>


                            <div class='col num12'
                                style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                <div style='width:100% !important;'>

                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>


                                        <table borde='0' cellpadding='0' cellspacing='0' class='divider'
                                            role='presentation'
                                            style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                            valign='top' width='100%'>
                                            <tbody>
                                                <tr style='vertical-align: top;' valign='top'>
                                                    <td class='divider_inner'
                                                        style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;'
                                                        valign='top'>
                                                        <table alig='center' borde='0' cellpadding='0'
                                                            cellspacing='0' class='divider_content' height='1'
                                                            role='presentation'
                                                            style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid transparent; height: 1px; width: 100%;'
                                                            valign='top' width='100%'>
                                                            <tbody>
                                                                <tr style='vertical-align: top;' valign='top'>
                                                                    <td height='1'
                                                                        style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                        valign='top'><span></span></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div>
                    <div class='block-grid'
                        style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff; background-image: linear-gradient(#fffffe,#f8fffc);'>

                        <div>

                            <div class='col num12'
                                style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>

                                <div style='width:100% !important;'>

                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:60px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>

                                        <div align='center' class='img-container center autowidth'
                                            style='padding-right: 0px;padding-left: 0px;'>




                                        </div>

                                        <div
                                            style='color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:20px;padding-right:38px;padding-bottom:10px;padding-left:38px;'>
                                            <div
                                                style='line-height: 1.2; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 14px;'>
                                                <p
                                                    style='font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 17px; margin: 0;'>
                                                    <span style='color: #000000;'><span
                                                            style='font-size: 22px;'><strong><span
                                                                    style='color: #0bb481;'><span
                                                                        style='color: #003066;'>Afri</span>PayX</span> ${data.title}</strong></span></span>
                                                </p>
                                            </div>
                                        </div>


                                        <div
                                            style='color:#000e62;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:0px;padding-right:0px;padding-bottom:10px;padding-left:0px;'>
                                            <div
                                                style='line-height: 1.2; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #000e62; mso-line-height-alt: 14px;'>
                                                <p
                                                    style='font-size: 16px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 19px; margin: 0;'>
                                                    <span style='color: #003366;'><strong> ${data.message}</strong></span>
                                                </p>
                                            </div>
                                        </div>


                                        <div
                                            style='color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:38px;padding-bottom:30px;padding-left:38px;'>
                                            <div
                                                style='line-height: 1.5; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 18px;'>
                                            </div>
                                        </div>
                                        <div align='center' class='img-container center autowidth'
                                            style='padding-right: 0px;padding-left: 0px;'>

                                            <table>
                                              
                                            </table>
                                            <br>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div style='background-color:transparent;'>
                    <div class='block-grid mixed-two-up'
                        style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;'>
                        <div style='border-collapse: collapse;display: table;width: 100%;background-color:#31ad64;'>


                            <div class='col num8'
                                style='display: table-cell; vertical-align: top; min-width: 320px; max-width: 440px; width: 443px;'>
                                <div style='width:100% !important;'>

                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>


                                        <div
                                            style='color:#ffffff;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;'>
                                            <div
                                                style='font-size: 14px; line-height: 1.2; color: #ffffff; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 17px;'>
                                                <p
                                                    style='font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;'>
                                                    Powered by TAJIRI PROJECT</p>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>


                            <div class='col num4'
                                style='display: table-cell; vertical-align: top; max-width: 320px; min-width: 220px; width: 221px;'>
                                <div style='width:100% !important;'>

                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;'>


                                        <div
                                            style='color:#ffffff;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.5;padding-top:0px;padding-right:48px;padding-bottom:28px;padding-left:0px;'>
                                            <div
                                                style='line-height: 1.5; font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color: #ffffff; mso-line-height-alt: 18px;'>
                                                <br>
                                                <p
                                                    style='font-size: 14px; line-height: 1.5; word-break: break-word; text-align: left; font-family: inherit; mso-line-height-alt: 21px; margin: 0;'>
                                                </p>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div style='background-color:transparent;'>
                    <div class='block-grid'
                        style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f3f2f3;'>
                        <div style='border-collapse: collapse;display: table;width: 100%;background-color:#f3f2f3;'>
                            <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:transparent;'><tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:665px'><tr class='layout-full-width' style='background-color:#f3f2f3'><![endif]-->
                            <!--[if (mso)|(IE)]><td align='center' width='665' style='background-color:#f3f2f3;width:665px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                            <div class='col num12'
                                style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                <div style='width:100% !important;'>
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                        <!--<![endif]-->
                                        <table border='0' cellpadding='0' cellspacing='0' class='divider'
                                            role='presentation'
                                            style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                            valign='top' width='100%'>
                                            <tbody>
                                                <tr style='vertical-align: top;' valign='top'>
                                                    <td class='divider_inner'
                                                        style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;'
                                                        valign='top'>
                                                        <table align='center' border='0' cellpadding='0'
                                                            cellspacing='0' class='divider_content' height='1'
                                                            role='presentation'
                                                            style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid transparent; height: 1px; width: 100%;'
                                                            valign='top' width='100%'>
                                                            <tbody>
                                                                <tr style='vertical-align: top;' valign='top'>
                                                                    <td height='1'
                                                                        style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                        valign='top'><span></span></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                    </div>
                </div>
                <div style='background-color:transparent;'>
                    <div class='block-grid'
                        style='Margin: 0 auto; min-width: 320px; max-width: 665px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f3f2f3;'>
                        <div style='border-collapse: collapse;display: table;width: 100%;background-color:#f3f2f3;'>
                            <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color:transparent;'><tr><td align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:665px'><tr class='layout-full-width' style='background-color:#f3f2f3'><![endif]-->
                            <!--[if (mso)|(IE)]><td align='center' width='665' style='background-color:#f3f2f3;width:665px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;' valign='top'><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;'><![endif]-->
                            <div class='col num12'
                                style='min-width: 320px; max-width: 665px; display: table-cell; vertical-align: top; width: 665px;'>
                                <div style='width:100% !important;'>
                                    <!--[if (!mso)&(!IE)]><!-->
                                    <div
                                        style='border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;'>
                                        <!--<![endif]-->
                                        <div class='mobile_hide'>
                                            <table border='0' cellpadding='0' cellspacing='0' class='divider'
                                                role='presentation'
                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                valign='top' width='100%'>
                                                <tbody>
                                                    <tr style='vertical-align: top;' valign='top'>
                                                        <td class='divider_inner'
                                                            style='word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 15px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px;'
                                                            valign='top'>
                                                            <table align='center' border='0' cellpadding='0'
                                                                cellspacing='0' class='divider_content'
                                                                role='presentation'
                                                                style='table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;'
                                                                valign='top' width='100%'>
                                                                <tbody>
                                                                    <tr style='vertical-align: top;' valign='top'>
                                                                        <td style='word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'
                                                                            valign='top'><span></span></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!--[if (!mso)&(!IE)]><!-->
                                    </div>
                                    <!--<![endif]-->
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
        </tr>
    </tbody>
</table>
</body>

</html>`;
        // html body

        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        transporter.verify((err, success) => {
          if (err) {
            console.log(err);
          }
          console.log("server is ready to receive message " + success);
        });
        transporter.sendMail(
          {
            from: '"Test Person" <testemail@gmail.com>',
            to: `${results[0].email}`,
            subject: `${data.title}`,
            html: output, // html body
          },
          function (err, info) {
            if (err) {
              return callBack(err);
            }
            console.log("message sent: %s", info.messageId);
            return callBack("Email Sent");
          }
        );
      }
    );
  },
};
