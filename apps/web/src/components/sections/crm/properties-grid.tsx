"use client";

import { useMemo } from "react";
import type { Property } from "@/lib/mock-types";
import { PropertyCard } from "./property-card";
import type { CrmFilter } from "./crm-toggle";

interface PropertiesGridProps {
  properties: Property[];
  filter: CrmFilter;
}

export function PropertiesGrid({ properties, filter }: PropertiesGridProps) {
  const filtered = useMemo(() => {
    if (filter === "todos") return properties;
    return properties.filter((p) => p.finalidade === filter);
  }, [properties, filter]);

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center text-sm text-muted">
        Nenhum imóvel encontrado nesse filtro.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((property, i) => (
        <PropertyCard key={property.id} property={property} index={i} />
      ))}
    </div>
  );
}
