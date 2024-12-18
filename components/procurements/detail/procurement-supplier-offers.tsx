'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SUPPLIER_OFFER_STATUS_COLORS } from '@/lib/status-colors';

interface SupplierOffer {
  id: string;
  supplierName: string;
  proposedProducts: number;
  chosenProducts: number;
  totalValue: number;
  totalValueWithVat: number;
  status: 'pending' | 'approved' | 'rejected';
  proposedProductDetails?: any[]; // Replace with actual type
  chosenProductDetails?: any[]; // Replace with actual type
}

// Mock data - replace with actual data in production
const mockOffers: SupplierOffer[] = [
  {
    id: '1',
    supplierName: 'Supplier A',
    proposedProducts: 5,
    chosenProducts: 3,
    totalValue: 15000,
    totalValueWithVat: 17700,
    status: 'approved',
    proposedProductDetails: [
      { id: '1', name: 'Concrete Mix', quantity: 1000, unit: 'kg' },
      { id: '2', name: 'Steel Rebar', quantity: 500, unit: 'kg' },
    ],
    chosenProductDetails: [
      { id: '1', name: 'Concrete Mix', quantity: 800, unit: 'kg' },
      { id: '2', name: 'Steel Rebar', quantity: 300, unit: 'kg' },
    ],
  },
  {
    id: '2',
    supplierName: 'Supplier B',
    proposedProducts: 4,
    chosenProducts: 2,
    totalValue: 12000,
    totalValueWithVat: 14160,
    status: 'pending',
    proposedProductDetails: [
      { id: '3', name: 'Cement', quantity: 200, unit: 'ton' },
      { id: '4', name: 'Gravel', quantity: 300, unit: 'm3' },
    ],
    chosenProductDetails: [
      { id: '3', name: 'Cement', quantity: 150, unit: 'ton' },
    ],
  },
];

export function ProcurementSupplierOffers() {
  const [selectedProducts, setSelectedProducts] = useState<any[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductsView = (products: any[]) => {
    setSelectedProducts(products);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Companies Providing Price Offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Proposed Products</TableHead>
                <TableHead>Chosen Products</TableHead>
                <TableHead>Total Value (Exc. VAT)</TableHead>
                <TableHead>Total Value (Inc. VAT)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOffers.map((offer) => {
                const statusConfig = SUPPLIER_OFFER_STATUS_COLORS[offer.status];
                return (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">
                      {offer.supplierName}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleProductsView(offer.proposedProductDetails || [])}
                      >
                        {offer.proposedProducts}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleProductsView(offer.chosenProductDetails || [])}
                      >
                        {offer.chosenProducts}
                      </Button>
                    </TableCell>
                    <TableCell>${offer.totalValue.toLocaleString()}</TableCell>
                    <TableCell>${offer.totalValueWithVat.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="custom"
                        customClassName={`${statusConfig.badge}`}
                      >
                        {offer.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}
