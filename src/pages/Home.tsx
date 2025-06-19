import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center my-6">{t("home_title")}</h1>
      <p className="text-center text-lg text-gray-700">{t("home_description")}</p>
    </div>
  );
};

export default Home;