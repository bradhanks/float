import Image, { ImageProps } from 'next/image'
import { FadeIn } from '@/components/FadeIn'

// Customer logos (light)
import lucidLogoLight from '@/images/customers/lucid-software/logo-light.svg'
import einblickLogoLight from '@/images/customers/einblick-ai/logo-light.svg'
import whisticLogoLight from '@/images/customers/whistic/logo-light.svg'
import rivetLogoLight from '@/images/customers/rivet-health/logo-light.svg'
import zightLogoLight from '@/images/customers/zight/logo-light.svg'
import zipbooksLogoLight from '@/images/customers/zipbooks/logo-light.svg'
import integrationAppLogoLight from '@/images/customers/integration-app/logo-light.svg'
import newtonxLogoLight from '@/images/customers/newtonx/logo-light.svg'
import ripoffReportLogoLight from '@/images/customers/ripoff-report/logo-light.svg'
import blueMatadorLogoLight from '@/images/customers/blue-matador/logo-light.svg'
import pqlLogoLight from '@/images/customers/pql/logo-light.svg'
import suntellLogoLight from '@/images/customers/suntell/logo-light.svg'
import arcadeaGroupLogoLight from '@/images/customers/arcadia-group/logo-light.svg'
import cobrowseLogoLight from '@/images/customers/cobrowse/logo-light.svg'

// Customer logos (dark)
import lucidLogoDark from '@/images/customers/lucid-software/logo-dark.svg'
import einblickLogoDark from '@/images/customers/einblick-ai/logo-dark.svg'
import whisticLogoDark from '@/images/customers/whistic/logo-dark.svg'
import rivetLogoDark from '@/images/customers/rivet-health/logo-dark.svg'
import zightLogoDark from '@/images/customers/zight/logo-dark.svg'
import zipbooksLogoDark from '@/images/customers/zipbooks/logo-dark.svg'
import integrationAppLogoDark from '@/images/customers/integration-app/logo-dark.svg'
import newtonxLogoDark from '@/images/customers/newtonx/logo-dark.svg'
import ripoffReportLogoDark from '@/images/customers/ripoff-report/logo-dark.svg'
import blueMatadorLogoDark from '@/images/customers/blue-matador/logo-dark.svg'
import pqlLogoDark from '@/images/customers/pql/logo-dark.svg'
import suntellLogoDark from '@/images/customers/suntell/logo-dark.svg'
import arcadeaGroupLogoDark from '@/images/customers/arcadia-group/logo-dark.svg'
import cobrowseLogoDark from '@/images/customers/cobrowse/logo-dark.svg'

// Customer logomarks (light)
import lucidLogomarkLight from '@/images/customers/lucid-software/logomark-light.svg'
import einblickLogomarkLight from '@/images/customers/einblick-ai/logomark-light.svg'
import whisticLogomarkLight from '@/images/customers/whistic/logomark-light.svg'
import rivetLogomarkLight from '@/images/customers/rivet-health/logomark-light.svg'
import zightLogomarkLight from '@/images/customers/zight/logomark-light.svg'
import zipbooksLogomarkLight from '@/images/customers/zipbooks/logomark-light.svg'
import integrationAppLogomarkLight from '@/images/customers/integration-app/logomark-light.svg'
import newtonxLogomarkLight from '@/images/customers/newtonx/logomark-light.svg'
import ripoffReportLogomarkLight from '@/images/customers/ripoff-report/logomark-light.svg'
import blueMatadorLogomarkLight from '@/images/customers/blue-matador/logomark-light.svg'
import pqlLogomarkLight from '@/images/customers/pql/logomark-light.svg'
import suntellLogomarkLight from '@/images/customers/suntell/logomark-light.svg'
import arcadeaGroupLogomarkLight from '@/images/customers/arcadia-group/logomark-light.svg'
import cobrowseLogomarkLight from '@/images/customers/cobrowse/logomark-light.svg'

// Customer logomarks (dark)
import lucidLogomarkDark from '@/images/customers/lucid-software/logomark-dark.svg'
import einblickLogomarkDark from '@/images/customers/einblick-ai/logomark-dark.svg'
import whisticLogomarkDark from '@/images/customers/whistic/logomark-dark.svg'
import rivetLogomarkDark from '@/images/customers/rivet-health/logomark-dark.svg'
import zightLogomarkDark from '@/images/customers/zight/logomark-dark.svg'
import zipbooksLogomarkDark from '@/images/customers/zipbooks/logomark-dark.svg'
import integrationAppLogomarkDark from '@/images/customers/integration-app/logomark-dark.svg'
import newtonxLogomarkDark from '@/images/customers/newtonx/logomark-dark.svg'
import ripoffReportLogomarkDark from '@/images/customers/ripoff-report/logomark-dark.svg'
import blueMatadorLogomarkDark from '@/images/customers/blue-matador/logomark-dark.svg'
import pqlLogomarkDark from '@/images/customers/pql/logomark-dark.svg'
import suntellLogomarkDark from '@/images/customers/suntell/logomark-dark.svg'
import arcadeaGroupLogomarkDark from '@/images/customers/arcadia-group/logomark-dark.svg'
import cobrowseLogomarkDark from '@/images/customers/cobrowse/logomark-dark.svg'

type CustomerInfo = {
  name: string
  logoLight: ImageProps['src']
  logoDark: ImageProps['src']
  logomarkLight: ImageProps['src']
  logomarkDark: ImageProps['src']
}

type Customer =
  | 'lucid'
  | 'einblick'
  | 'whistic'
  | 'rivet'
  | 'zight'
  | 'zipbooks'
  | 'integrationApp'
  | 'newtonx'
  | 'ripoffReport'
  | 'blueMatador'
  | 'pql'
  | 'suntell'
  | 'arcadeaGroup'
  | 'cobrowse'

type Customers = {
  [Key in Customer]: CustomerInfo
}

export const customers: Customers = {
  lucid: {
    name: 'Lucid Software',
    logoLight: lucidLogoLight,
    logoDark: lucidLogoDark,
    logomarkLight: lucidLogomarkLight,
    logomarkDark: lucidLogomarkDark,
  },
  einblick: {
    name: 'Einblick.ai',
    logoLight: einblickLogoLight,
    logoDark: einblickLogoDark,
    logomarkLight: einblickLogomarkLight,
    logomarkDark: einblickLogomarkDark,
  },
  whistic: {
    name: 'Whistic',
    logoLight: whisticLogoLight,
    logoDark: whisticLogoDark,
    logomarkLight: whisticLogomarkLight,
    logomarkDark: whisticLogomarkDark,
  },
  rivet: {
    name: 'Rivet Health',
    logoLight: rivetLogoLight,
    logoDark: rivetLogoDark,
    logomarkLight: rivetLogomarkLight,
    logomarkDark: rivetLogomarkDark,
  },
  zight: {
    name: 'Zight',
    logoLight: zightLogoLight,
    logoDark: zightLogoDark,
    logomarkLight: zightLogomarkLight,
    logomarkDark: zightLogomarkDark,
  },
  zipbooks: {
    name: 'ZipBooks',
    logoLight: zipbooksLogoLight,
    logoDark: zipbooksLogoDark,
    logomarkLight: zipbooksLogomarkLight,
    logomarkDark: zipbooksLogomarkDark,
  },
  integrationApp: {
    name: 'Integration.app',
    logoLight: integrationAppLogoLight,
    logoDark: integrationAppLogoDark,
    logomarkLight: integrationAppLogomarkLight,
    logomarkDark: integrationAppLogomarkDark,
  },
  newtonx: {
    name: 'NewtonX',
    logoLight: newtonxLogoLight,
    logoDark: newtonxLogoDark,
    logomarkLight: newtonxLogomarkLight,
    logomarkDark: newtonxLogomarkDark,
  },
  ripoffReport: {
    name: 'Ripoff Report',
    logoLight: ripoffReportLogoLight,
    logoDark: ripoffReportLogoDark,
    logomarkLight: ripoffReportLogomarkLight,
    logomarkDark: ripoffReportLogomarkDark,
  },
  blueMatador: {
    name: 'Blue Matador',
    logoLight: blueMatadorLogoLight,
    logoDark: blueMatadorLogoDark,
    logomarkLight: blueMatadorLogomarkLight,
    logomarkDark: blueMatadorLogomarkDark,
  },
  pql: {
    name: 'PQL',
    logoLight: pqlLogoLight,
    logoDark: pqlLogoDark,
    logomarkLight: pqlLogomarkLight,
    logomarkDark: pqlLogomarkDark,
  },
  suntell: {
    name: 'Suntell',
    logoLight: suntellLogoLight,
    logoDark: suntellLogoDark,
    logomarkLight: suntellLogomarkLight,
    logomarkDark: suntellLogomarkDark,
  },
  arcadeaGroup: {
    name: 'Arcadea Group',
    logoLight: arcadeaGroupLogoLight,
    logoDark: arcadeaGroupLogoDark,
    logomarkLight: arcadeaGroupLogomarkLight,
    logomarkDark: arcadeaGroupLogomarkDark,
  },
  cobrowse: {
    name: 'Cobrowse.io',
    logoLight: cobrowseLogoLight,
    logoDark: cobrowseLogoDark,
    logomarkLight: cobrowseLogomarkLight,
    logomarkDark: cobrowseLogomarkDark,
  },
}

export function ListCustomers({ customers }: { customers: Customers }) {
  return (Object.keys(customers) as Customer[]).map((key) => (
    <li key={key}>
      <FadeIn>
        <Image
          src={customers[key].logoLight}
          alt={customers[key].name}
          unoptimized
        />
      </FadeIn>
    </li>
  ))
}
