export interface ServicioTableItem {
  id: number;
  name: string;
  description: string;
  status: string;
  campaignId: number;
  subCampaign: string;
  clientId: number;
  serviceTypeId: number;
  createdAt: string;
  updatedAt?: string;
}
