"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

function BreadCrumbs() {
  const pathName = usePathname();

  const crumbs = pathName.split("/").filter((crumb) => crumb !== "");

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {crumbs.map((crumb, index) => {
            const link = `/${crumbs.slice(0, index + 1).join("/")}`;
            const isLast = index === crumbs.length - 1;

            return (
              <Fragment key={crumb}>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={crumb}>
                  {isLast ? (
                    <BreadcrumbPage>{crumb}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={link}>{crumb}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumbs;
