import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  INVENTORY_ROOM_STATUS,
  ROOM_INVENTORY_TABLE_HEADERS,
} from "@/config/admin.config";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

function InventoryTable({ inventories = [], inventoryLoading }) {
  return (
    <div className="overflow-hidden border rounded-md mb-3">
      <Table>
        <TableHeader>
          <TableRow>
            {ROOM_INVENTORY_TABLE_HEADERS.map((header) => (
              <TableCell key={header.id} className={header.className}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {inventoryLoading && (
            <>
              <InventoryTableLoadingSkeleton />
              <InventoryTableLoadingSkeleton />
              <InventoryTableLoadingSkeleton />
              <InventoryTableLoadingSkeleton />
            </>
          )}

          {!inventoryLoading && inventories.length === 0 && (
            <TableRow className="pointer-events-none">
              <TableCell
                colSpan={ROOM_INVENTORY_TABLE_HEADERS.length}
                className="h-32 text-center">
                No inventory have been made yet.
              </TableCell>
            </TableRow>
          )}

          {!inventoryLoading &&
            inventories.map((inventory, i) => (
              <TableRow key={inventory.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {dayjs(inventory.inventoryDate).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>{inventory.bookedCount}</TableCell>
                <TableCell>{inventory.reservedCount}</TableCell>
                <TableCell>{inventory.surgeFactor}</TableCell>
                <TableCell className="font-mono">{inventory.price}</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 font-medium capitalize rounded-md w-max",
                      INVENTORY_ROOM_STATUS[
                        inventory.closed ? "inactive" : "active"
                      ].className
                    )}>
                    {
                      INVENTORY_ROOM_STATUS[
                        inventory.closed ? "inactive" : "active"
                      ].text
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

function InventoryTableLoadingSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-6 rounded-full" />
      </TableCell>
    </TableRow>
  );
}

export default InventoryTable;
