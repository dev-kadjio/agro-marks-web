import Form from "next/form";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { SelectField, TextField } from "@/components/filters/fields";
import { buttonClasses } from "@/components/ui/styles";
import type { SpecialtyId } from "@/domain/farmer";
import type { RegionId } from "@/domain/region";
import type { Option } from "@/services/view-models";

interface FarmerSearchFormProps {
  readonly action: string;
  readonly regions: readonly Option<RegionId>[];
  readonly specialties: readonly Option<SpecialtyId>[];
}

export function FarmerSearchForm({ action, regions, specialties }: FarmerSearchFormProps) {
  const t = useTranslations();
  return (
    <Form
      action={action}
      role="search"
      className="grid gap-4 rounded-card border border-line bg-white p-5 sm:p-6 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end"
    >
      <TextField
        id="home-farmer-q"
        name="q"
        type="search"
        maxLength={80}
        label={t("filters.searchLabel")}
        placeholder={t("filters.farmerSearchPlaceholder")}
      />
      <SelectField id="home-farmer-region" name="region" label={t("filters.region")} placeholder={t("filters.allRegions")} value={undefined} options={regions} />
      <SelectField
        id="home-farmer-specialty"
        name="specialty"
        label={t("filters.specialty")}
        placeholder={t("filters.allSpecialties")}
        value={undefined}
        options={specialties}
      />
      <button type="submit" className={buttonClasses({ className: "w-full md:w-auto" })}>
        <Search aria-hidden="true" className="size-4" />
        {t("home.farmerSearch.submit")}
      </button>
    </Form>
  );
}
