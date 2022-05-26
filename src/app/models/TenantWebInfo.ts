import { Company } from "./Company";
import { Department } from "./Department";
import { Lease } from "./Lease";

export interface TenantWebInfo {
    company: Company,
    department: Department,
    lease: Lease,
}