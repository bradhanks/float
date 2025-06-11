import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Solana Beach" invert={invert}>
          125 South Highway 101
          <br />
          Solana Beach, California 92075
        </Office>
      </li>
      <li>
        <Office name="Boulder" invert={invert}>
          2101 Pearl Street
          <br />
          Boulder, Colorado 80302
        </Office>
      </li>
      <li>
        <Office name="Lehi" invert={invert}>
          2701 North Thanksgiving Way Lehi, Utah 84043
        </Office>
      </li>
      <li>
        <Office name="Portland" invert={invert}>
          1120 Southeast Madison Street
          <br />
          Portland, Oregon 97214
        </Office>
      </li>
    </ul>
  )
}
