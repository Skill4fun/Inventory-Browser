import Wrapper from '../helper/components/Wrapper';
import QuotationTable from '../components/PriceQuotation/QuotationTable';

export default function Purchases() {
  return (
    <Wrapper minWidthPx={350} computer={16} textAlign="center">
      <QuotationTable />
    </Wrapper>
  );
}
