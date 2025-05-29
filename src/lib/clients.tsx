import Image, { type ImageProps } from 'next/image'
import { FadeIn } from '@/components/FadeIn'


// Client logos (light)
import lucidLogoLight from '@/images/clients/lucid-software/logo-light.svg'
import einblickLogoLight from '@/images/clients/einblick-ai/logo-light.svg'
import whisticLogoLight from '@/images/clients/whistic/logo-light.svg'
import rivetLogoLight from '@/images/clients/rivet-health/logo-light.svg'
import zightLogoLight from '@/images/clients/zight/logo-light.svg'
import zipbooksLogoLight from '@/images/clients/zipbooks/logo-light.svg'
import integrationAppLogoLight from '@/images/clients/integration-app/logo-light.svg'
import newtonxLogoLight from '@/images/clients/newtonx/logo-light.svg'
import ripoffReportLogoLight from '@/images/clients/ripoff-report/logo-light.svg'
import blueMatadorLogoLight from '@/images/clients/blue-matador/logo-light.svg'
import pqlLogoLight from '@/images/clients/pql/logo-light.svg'
import suntellLogoLight from '@/images/clients/suntell/logo-light.svg'
import arcadeaGroupLogoLight from '@/images/clients/arcadia-group/logo-light.svg'
import cobrowseLogoLight from '@/images/clients/cobrowse/logo-light.svg'

// Client logos (dark)
import lucidLogoDark from '@/images/clients/lucid-software/logo-dark.svg'
import einblickLogoDark from '@/images/clients/einblick-ai/logo-dark.svg'
import whisticLogoDark from '@/images/clients/whistic/logo-dark.svg'
import rivetLogoDark from '@/images/clients/rivet-health/logo-dark.svg'
import zightLogoDark from '@/images/clients/zight/logo-dark.svg'
import zipbooksLogoDark from '@/images/clients/zipbooks/logo-dark.svg'
import integrationAppLogoDark from '@/images/clients/integration-app/logo-dark.svg'
import newtonxLogoDark from '@/images/clients/newtonx/logo-dark.svg'
import ripoffReportLogoDark from '@/images/clients/ripoff-report/logo-dark.svg'
import blueMatadorLogoDark from '@/images/clients/blue-matador/logo-dark.svg'
import pqlLogoDark from '@/images/clients/pql/logo-dark.svg'
import suntellLogoDark from '@/images/clients/suntell/logo-dark.svg'
import arcadeaGroupLogoDark from '@/images/clients/arcadia-group/logo-dark.svg'
import cobrowseLogoDark from '@/images/clients/cobrowse/logo-dark.svg'

// Client logomarks (light)
import lucidLogomarkLight from '@/images/clients/lucid-software/logomark-light.svg'
import einblickLogomarkLight from '@/images/clients/einblick-ai/logomark-light.svg'
import whisticLogomarkLight from '@/images/clients/whistic/logomark-light.svg'
import rivetLogomarkLight from '@/images/clients/rivet-health/logomark-light.svg'
import zightLogomarkLight from '@/images/clients/zight/logomark-light.svg'
import zipbooksLogomarkLight from '@/images/clients/zipbooks/logomark-light.svg'
import integrationAppLogomarkLight from '@/images/clients/integration-app/logomark-light.svg'
import newtonxLogomarkLight from '@/images/clients/newtonx/logomark-light.svg'
import ripoffReportLogomarkLight from '@/images/clients/ripoff-report/logomark-light.svg'
import blueMatadorLogomarkLight from '@/images/clients/blue-matador/logomark-light.svg'
import pqlLogomarkLight from '@/images/clients/pql/logomark-light.svg'
import suntellLogomarkLight from '@/images/clients/suntell/logomark-light.svg'
import arcadeaGroupLogomarkLight from '@/images/clients/arcadia-group/logomark-light.svg'
import cobrowseLogomarkLight from '@/images/clients/cobrowse/logomark-light.svg'

// Client logomarks (dark)
import lucidLogomarkDark from '@/images/clients/lucid-software/logomark-dark.svg'
import einblickLogomarkDark from '@/images/clients/einblick-ai/logomark-dark.svg'
import whisticLogomarkDark from '@/images/clients/whistic/logomark-dark.svg'
import rivetLogomarkDark from '@/images/clients/rivet-health/logomark-dark.svg'
import zightLogomarkDark from '@/images/clients/zight/logomark-dark.svg'
import zipbooksLogomarkDark from '@/images/clients/zipbooks/logomark-dark.svg'
import integrationAppLogomarkDark from '@/images/clients/integration-app/logomark-dark.svg'
import newtonxLogomarkDark from '@/images/clients/newtonx/logomark-dark.svg'
import ripoffReportLogomarkDark from '@/images/clients/ripoff-report/logomark-dark.svg'
import blueMatadorLogomarkDark from '@/images/clients/blue-matador/logomark-dark.svg'
import pqlLogomarkDark from '@/images/clients/pql/logomark-dark.svg'
import suntellLogomarkDark from '@/images/clients/suntell/logomark-dark.svg'
import arcadeaGroupLogomarkDark from '@/images/clients/arcadia-group/logomark-dark.svg'
import cobrowseLogomarkDark from '@/images/clients/cobrowse/logomark-dark.svg'

type ClientInfo = {
  name: string,
  logoLight: ImageProps['src'],
  logoDark: ImageProps['src'],
  logomarkLight: ImageProps['src'],
  logomarkDark: ImageProps['src']
}

type Client = 'lucid'
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
  | 'cobrowse';

type Clients = {
  [Key in Client]: ClientInfo
}

export const clients: Clients = {
  lucid: { name: 'Lucid Software', logoLight: lucidLogoLight, logoDark: lucidLogoDark, logomarkLight: lucidLogomarkLight, logomarkDark: lucidLogomarkDark },
  einblick: { name: 'Einblick.ai', logoLight: einblickLogoLight, logoDark: einblickLogoDark, logomarkLight: einblickLogomarkLight, logomarkDark: einblickLogomarkDark },
  whistic: { name: 'Whistic', logoLight: whisticLogoLight, logoDark: whisticLogoDark, logomarkLight: whisticLogomarkLight, logomarkDark: whisticLogomarkDark },
  rivet: { name: 'Rivet Health', logoLight: rivetLogoLight, logoDark: rivetLogoDark, logomarkLight: rivetLogomarkLight, logomarkDark: rivetLogomarkDark },
  zight: { name: 'Zight', logoLight: zightLogoLight, logoDark: zightLogoDark, logomarkLight: zightLogomarkLight, logomarkDark: zightLogomarkDark },
  zipbooks: { name: 'ZipBooks', logoLight: zipbooksLogoLight, logoDark: zipbooksLogoDark, logomarkLight: zipbooksLogomarkLight, logomarkDark: zipbooksLogomarkDark },
  integrationApp: { name: 'Integration.app', logoLight: integrationAppLogoLight, logoDark: integrationAppLogoDark, logomarkLight: integrationAppLogomarkLight, logomarkDark: integrationAppLogomarkDark },
  newtonx: { name: 'NewtonX', logoLight: newtonxLogoLight, logoDark: newtonxLogoDark, logomarkLight: newtonxLogomarkLight, logomarkDark: newtonxLogomarkDark },
  ripoffReport: { name: 'Ripoff Report', logoLight: ripoffReportLogoLight, logoDark: ripoffReportLogoDark, logomarkLight: ripoffReportLogomarkLight, logomarkDark: ripoffReportLogomarkDark },
  blueMatador: { name: 'Blue Matador', logoLight: blueMatadorLogoLight, logoDark: blueMatadorLogoDark, logomarkLight: blueMatadorLogomarkLight, logomarkDark: blueMatadorLogomarkDark },
  pql: { name: 'PQL', logoLight: pqlLogoLight, logoDark: pqlLogoDark, logomarkLight: pqlLogomarkLight, logomarkDark: pqlLogomarkDark },
  suntell: { name: 'Suntell', logoLight: suntellLogoLight, logoDark: suntellLogoDark, logomarkLight: suntellLogomarkLight, logomarkDark: suntellLogomarkDark },
  arcadeaGroup: { name: 'Arcadea Group', logoLight: arcadeaGroupLogoLight, logoDark: arcadeaGroupLogoDark, logomarkLight: arcadeaGroupLogomarkLight, logomarkDark: arcadeaGroupLogomarkDark },
  cobrowse: { name: 'Cobrowse.io', logoLight: cobrowseLogoLight, logoDark: cobrowseLogoDark, logomarkLight: cobrowseLogomarkLight, logomarkDark: cobrowseLogomarkDark }
}

export function ListClients({ clients }: { clients: Clients }) {
  return (
    (Object.keys(clients) as Client[]).map((key) =>
      <li key={key} >
        <FadeIn>
          <Image src={clients[key].logoLight} alt={clients[key].name} unoptimized />
        </FadeIn>
      </li>
    )
  )
}
