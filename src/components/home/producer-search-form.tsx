import Form from "next/form";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { SelectField, TextField } from "@/components/filters/fields";
import { buttonClasses } from "@/components/ui/styles";
import type { ProducerType, SpecialtyId } from "@/domain/producer";
import type { RegionId } from "@/domain/region";
import type { Option } from "@/services/view-models";

interface ProducerSearchFormProps {
  readonly action: string;
  readonly types: readonly Option<ProducerType>[];
  readonly regions: readonly Option<RegionId>[];
  readonly specialties: readonly Option<SpecialtyId>[];
}

export function ProducerSearchForm({ action, types, regions, specialties }: ProducerSearchFormProps) {
  const t = useTranslations();
  return (
    <Form
      action={action}
      role="search"
      className="grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end"
    >
      <TextField
        id="home-producer-q"
        name="q"
        type="search"
        maxLength={80}
        label={t("filters.searchLabel")}
        placeholder={t("filters.producerSearchPlaceholder")}
      />
      <SelectField id="home-producer-type" name="type" label={t("filters.type")} placeholder={t("filters.allTypes")} value={undefined} options={types} />
      <SelectField id="home-producer-region" name="region" label={t("filters.region")} placeholder={t("filters.allRegions")} value={undefined} options={regions} />
      <SelectField
        id="home-producer-specialty"
        name="specialty"
        label={t("filters.specialty")}
        placeholder={t("filters.allSpecialties")}
        value={undefined}
        options={specialties}
      />
      <button type="submit" className={buttonClasses({ className: "w-full lg:w-auto" })}>
        <Search aria-hidden="true" className="size-4" />
        {t("home.producerSearch.submit")}
      </button>
    </Form>
  );
}
