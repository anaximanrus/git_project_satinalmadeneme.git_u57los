import { Badge } from '@/components/ui/badge';
// ... (other imports)
import { SUPPLIER_PROPOSAL_STATUS_COLORS } from '@/lib/status-colors';

export function ProcurementSupplierProposals() {
  // ... (previous code)

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Supplier Proposals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {/* ... (previous table header) */}
            <TableBody>
              {mockProposals.map((proposal) => {
                const statusConfig = SUPPLIER_PROPOSAL_STATUS_COLORS[proposal.status];
                return (
                  <TableRow key={proposal.id}>
                    {/* ... (previous columns) */}
                    <TableCell>
                      <Badge 
                        variant="custom"
                        customClassName={`${statusConfig.badge}`}
                      >
                        {proposal.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* ... (rest of the component) */}
    </>
  );
}
