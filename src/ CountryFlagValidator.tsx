import  { useState } from "react";

interface Props {
    password: string;
}

const countries = [
    "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
];

export const CountryFlagValidator = ({ password }: Props) => {
    const [selectedCountry] = useState(() =>
        countries[Math.floor(Math.random() * countries.length)]
    );


    const isCorrect = password.includes(selectedCountry);

    return (

        <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg backdrop-blur-md border border-gray-300 dark:border-white/20 text-center space-y-4">

            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Do hesla musíte zahrnout kód této země:
            </p>

            <div className="flex justify-center">
                <img
                    src={`https://countryflagsapi.netlify.app/flag/${selectedCountry}.svg`}
                    alt="flag"
                    className="w-24 h-16 object-cover rounded-md border border-gray-300"
                />
            </div>

            <div
                className={`p-3 rounded-lg font-medium transition-all ${
                    isCorrect
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                }`}
            >
                {isCorrect ? "✅ Kód nalezen" : "❌ Kód v hesle chybí"}
            </div>

        </div>


    )
};
