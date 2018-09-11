export interface TodoInterface {
   /**
    * titre du todo
    * @var String
    */
    title : String;
    /**
     * vrai si todo est coché
     * @var boolean
     */
    isChecked?: boolean;
    /**
     * Date de debut
     * @var Date
     */
    debut: Date;
    /**
     * Date de fin
     * @var Date
     */
    fin: Date;

    /**@var (optional) id number
    * Identifiant du todo
     */
    id?: number;
    
}
