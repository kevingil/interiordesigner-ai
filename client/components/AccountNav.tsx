import Link from 'next/link';

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/account">
            Home
          </Link>
        </li>
        <li>
          <Link href="/account/renders">
            Renders
          </Link>
        </li>
        <li>
          <Link href="/account/billing">
            Billing
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
