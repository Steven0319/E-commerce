import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      <h1 className="text-4xl font-bold text-center text-gray-800">{t("contact_title")}</h1>

      <p className="text-center text-gray-600 text-lg">{t("contact_intro")}</p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info + Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">{t("contact_location_title")}</h2>
            <p className="text-gray-600 mt-2">{t("contact_address")}</p>
            <p className="text-gray-600">{t("contact_email")}: support@shop.com</p>
            <p className="text-gray-600">{t("contact_phone")}: +506 8888 8888</p>
            <p className="text-gray-600">{t("contact_hours")}: {t("contact_hours_value")}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder={t("contact_name_placeholder")}
              {...register("name", { required: t("contact_name_required") })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <input
              type="email"
              placeholder={t("contact_email_placeholder")}
              {...register("email", {
                required: t("contact_email_required"),
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t("contact_email_invalid"),
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <textarea
              placeholder={t("contact_message_placeholder")}
              rows={4}
              {...register("message", { required: t("contact_message_required") })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.message && <p className="text-red-500">{errors.message.message}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              {t("contact_submit")}
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div>
          <iframe
            title={t("contact_map_title")}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.290009770587!2d-84.10912378505435!3d9.999423175434654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fbf9920621b3%3A0x8810c0aa585dc5d4!2sUniversidad%20Nacional%20de%20Costa%20Rica!5e0!3m2!1ses!2scr!4v1718319337467!5m2!1ses!2scr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;