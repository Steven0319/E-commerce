import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-3xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">{t("about_title")}</h1>

      <p className="text-xl text-gray-700 leading-relaxed">
        {t("about_intro")} <span className="font-semibold text-blue-600">Shop.com</span>.
      </p>

      <p className="text-lg text-gray-600">{t("about_mission")}</p>

      <div className="text-left bg-gray-100 rounded-lg p-6 shadow-md space-y-2">
        <ul className="list-none space-y-2">
          <li className="flex items-center">
            <span className="text-green-500 text-xl mr-2">✔️</span>
            <span className="text-gray-700 text-lg">{t("about_premium")}</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 text-xl mr-2">✔️</span>
            <span className="text-gray-700 text-lg">{t("about_secure")}</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 text-xl mr-2">✔️</span>
            <span className="text-gray-700 text-lg">{t("about_support")}</span>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-600">{t("about_community")}</p>

      <p className="text-lg font-medium text-blue-700">{t("about_experience")}</p>
    </div>
  );
};

export default About;