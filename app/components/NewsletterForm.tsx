import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../utils/i18n";
import closebutton from "../assets/closeButton.svg";

interface NewsletterFormProps {
  setShowForm: (showForm: boolean) => void;
}

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

function InputField(props: InputFieldProps) {
  return (
    <div className="p-2 border-t border-black focus-within:bg-white ">
      <label htmlFor={props.id}>
        {props.label}:
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          required={props.required}
          value={props.value}
          className="w-full bg-inherit focus:outline-white  placeholder-slate-700 focus:placeholder-slate-400"
          onChange={(e) => props.onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function NewsletterForm(props: NewsletterFormProps) {
  const [formInfo, setFormInfo] = useState<{ [key: string]: string }>({});
  const { t } = useTranslation();
  const formFields: FormField[] = [
    {
      id: "first_name",
      label: t(texts.firstName.label),
      type: "text",
      placeholder: t(texts.firstName.placeholder),
      required: true,
    },
    {
      id: "last_name",
      label: t(texts.lastName.label),
      type: "text",
      placeholder: t(texts.lastName.placeholder),
      required: true,
    },
    {
      id: "email",
      label: t(texts.email.label),
      type: "email",
      placeholder: t(texts.email.placeholder),
      required: true,
    },
    {
      id: "tlf",
      label: t(texts.phone.label),
      type: "text",
      placeholder: t(texts.phone.placeholder),
    },
  ];

  function handleSubmit() {
    const requiredFields = formFields.filter((field) => field.required);
    const missingFields = requiredFields.filter((field) => !formInfo[field.id]);

    if (missingFields.length > 0) {
      const missingFieldLabels = missingFields.map((field) => field.label);
      alert(`${missingFieldLabels.join(", ")} ${t(texts.required)}`);
      return;
    }

    alert(t(texts.feedback));
  }

  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      props.setShowForm(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormInfo({ ...formInfo, [fieldId]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        ref={ref}
        className="bg-strongblue border-2 relative border-black text-black w-auto md:w-1/3 h-4/5 md:h-2/3 m-4 grid grid-cols-1 grid-rows-auto"
      >
        <p className="flex flex-col justify-center text-base lg:text-xl p-2 text-center ">
          {t(texts.blurb)}
        </p>
        <button
          aria-label={t(texts.buttonLabel)}
          onClick={() => props.setShowForm(false)}
          className="font-sans text-2xl lg:text-4xl absolute top-0 right-0 pt-4 pr-4"
        >
          <img className="w-5" alt="" src={closebutton} />
        </button>
        <form className="grid grid-rows-auto text-black ">
          {formFields.map((field) => (
            <InputField
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formInfo[field.id] || ""}
              onChange={(value) => handleFieldChange(field.id, value)}
            />
          ))}
        </form>
        <p className="flex flex-col justify-center text-s p-2 border-t lg: text-base border-black">
          {t(texts.consent)}
        </p>
        <button
          type="submit"
          className="w-full h-full lg:text-xl underline border-t border-black hover:bg-[#69c1db]"
          onClick={handleSubmit}
        >
          {t(texts.submit)}
        </button>
      </div>
    </div>
  );
}

const texts = {
  blurb: {
    nb: "Meld deg på nyhetsbrev fra Bruddet og få eksklusiv info, billetter til redusert pris og andre tilbud!",
    en: "Sign up for our newsletter and get exclusive info, tickets at reduced prices and other offers!",
  },
  consent: {
    nb: "Ved å melde meg på nyhetsbrev samtykker jeg til at Brudd AS kan sende meg nyheter, tilbud om billetter og annen nyttig informasjon om Brudd og forestillinger, i kanalene jeg samtykker til under. *",
    en: "By signing up for the newsletter, I consent to Brudd AS sending me news, ticket offers and other useful information about Brudd and performances, in the channels I consent to below. *",
  },
  submit: {
    nb: "Meld på nyhetsbrev",
    en: "Sign up for newsletter",
  },
  feedback: {
    nb: "Du er meldt på nyhetsbrev",
    en: "You are signed up for the newsletter",
  },
  required: {
    nb: "er påkrevd",
    en: "is required",
  },
  firstName: {
    label: {
      nb: "Fornavn*",
      en: "First name*",
    },
    placeholder: {
      nb: "Ola",
      en: "John",
    },
  },
  lastName: {
    label: {
      nb: "Etternavn*",
      en: "Last name*",
    },
    placeholder: {
      nb: "Nordmann",
      en: "Smith",
    },
  },
  email: {
    label: {
      nb: "E-postadresse*",
      en: "Email*",
    },
    placeholder: {
      nb: "eksempel@eksempel.com",
      en: "example@example.com",
    },
  },
  phone: {
    label: {
      nb: "Telefonnummer",
      en: "Phone number",
    },
    placeholder: {
      nb: "+47 999 99 999",
      en: "+44 7123 456789",
    },
  },
  buttonLabel: {
    nb: "Lukk nyhetsbrev",
    en: "Close newsletter",
  },
};

export default NewsletterForm;
