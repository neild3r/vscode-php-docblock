export let doctrineTags = [
    {
        "tag": "@ORM\\Column",
        "snippet": "@ORM\\Column(type=\"${1|smallint,integer,bigint,decimal,float,string,ascii_string,text,guid,binary,blob,boolean,date,date_immutable,datetime,datetime_immutable,datetimetz,datetimetz_immutable,time,time_immutable,dateinterval,array,simple_array,json,object|}\",${2: name=\"${3:column_name}\",}${4: length=${5:255},}${6: precision=${7:2},}${8: scale=${9:2},}${10: unique=${11|false,true|},}${12: nullable=${13|false,true|},}${14: options=${15|default,unsigned,fixed,comment,collation,check|},}${16: columnDefinition=${17:\"DDL SQL snippet\"}})"
    },
    {
        "tag": "@ORM\\ColumnResult",
        "snippet": "@ORM\\ColumnResult(name=\"${1:The name of a column in the SELECT clause of a SQL query}\"})"
    },
    {
        "tag": "@ORM\\Cache",
        "snippet": "@ORM\\Cache${1:(${2:name=\"${3|READ_ONLY,READ_WRITE,NONSTRICT_READ_WRITE|}\",}${4: region=\"${5:A specific region name}\"})}"
    },
    {
        "tag": "@ORM\\ChangeTrackingPolicy",
        "snippet": "@ORM\\ChangeTrackingPolicy(\"${1|DEFERRED_IMPLICIT,DEFERRED_EXPLICIT,NOTIFY|}\")"
    },
    {
        "tag": "@ORM\\CustomIdGenerator",
        "snippet": "@ORM\\CustomIdGenerator(class=\"${1:Custom\\Namespace\\IdGenerator}\")"
    },
    {
        "tag": "@ORM\\DiscriminatorColumn",
        "snippet": "@ORM\\DiscriminatorColumn(name=\"${1:discr}\"${2:, type=\"${3:string}\"}${4:, length=${5:255}})"
    },
    {
        "tag": "@ORM\\DiscriminatorMap",
        "snippet": "@ORM\\DiscriminatorMap({\"base\" = \"Base\\BaseEntity\", \"concrete\" = \"Concrete\\ConcreteEntity\"})"
    },
    {
        "tag": "@ORM\\Embeddable",
        "snippet": "@ORM\\Embeddable"
    },
    {
        "tag": "@ORM\\Embedded",
        "snippet": "@ORM\\Embedded(class=\"${1:Namespace\\ClassName}\")"
    },
    {
        "tag": "@ORM\\Entity",
        "snippet": "@ORM\\Entity${1:(${2:repositoryClass=\"${3:Namespace\\RepositoryClassName}\", }${4:readOnly=${5|true,false|}})}"
    },
    {
        "tag": "@ORM\\EntityResult",
        "snippet": "@ORM\\EntityResult(entityClass=\"${1:Namespace\\ClassName}\"${2:, fields={${3}\\}}${4:, discriminatorColumn=\"${5:discr}\"})"
    },
    {
        "tag": "@ORM\\FieldResult",
        "snippet": "@ORM\\FieldResult(name=\"${1:Name of the persistent field or property of the class.}\"${2:, column=\"${5:Name of the column in the SELECT clause.}\"})"
    },
    {
        "tag": "@ORM\\GeneratedValue",
        "snippet": "@ORM\\GeneratedValue${1:(strategy=\"${2|AUTO,SEQUENCE,TABLE,IDENTITY,UUID,CUSTOM,NONE|}\")}"
    },
    {
        "tag": "@ORM\\HasLifecycleCallbacks",
        "snippet": "@ORM\\HasLifecycleCallbacks"
    },
    {
        "tag": "@ORM\\Index",
        "snippet": "@ORM\\Index(name=\"${1:index_name_idx}\", columns={\"${2:column_1}\"${3:, \"${4:column_2}\"}})${5:, options=\"{${6}\\}\"}"
    },
    {
        "tag": "@ORM\\Id",
        "snippet": "@ORM\\Id"
    },
    {
        "tag": "@ORM\\InheritanceType",
        "snippet": "@ORM\\InheritanceType(\"${1|SINGLE_TABLE,JOINED|}\")"
    },
    {
        "tag": "@ORM\\JoinColumn",
        "snippet": "@ORM\\JoinColumn${1:(${2:name=\"${3:Column name that holds the foreign key identifier for this relation}\", }${4:referencedColumnName=\"${5:id}\", }${6:unique=\"${7|false,true|}\", }${8:nullable=\"${9|true,false|}\", }${10:onDelete=\"${11:CASCADE}\", }${12:columnDefinition=\"${13:DDL SQL snippet}\"})}"
    },
    {
        "tag": "@ORM\\JoinColumns",
        "snippet": "@ORM\\JoinColumns"
    },
    {
        "tag": "@ORM\\JoinTable",
        "snippet": "@ORM\\JoinTable${1:(${2:name=\"${3:Database name of the join-table}\", }${4:joinColumns=\"${5}\", }${6:inverseJoinColumns=\"${7}\"})}"
    },
    {
        "tag": "@ORM\\ManyToOne",
        "snippet": "@ORM\\ManyToOne(targetEntity=\"${1:Namespace\\EntityClass}\"${2:, cascade={${3:\"persist\", }${4:\"remove\", }${5:\"merge\", }${6:\"detach\", }${7:\"refresh\", }${8:\"all\"}\\}}${9:, fetch=\"${10|LAZY,EAGER|}\"})"
    },
    {
        "tag": "@ORM\\ManyToMany",
        "snippet": "@ORM\\ManyToMany(targetEntity=\"${1:Namespace\\EntityClass}\"${2:, mappedBy=\"${3}\"}${4:, inversedBy=\"${5}\"}${6:, cascade={${7:\"persist\", }${8:\"remove\", }${9:\"merge\", }${10:\"detach\", }${11:\"refresh\", }${12:\"all\"}\\}}${13:, fetch=\"${14|LAZY,EXTRA_LAZY,EAGER|}\"}${15:, indexBy=\"${16}\"})"
    },
    {
        "tag": "@ORM\\MappedSuperclass",
        "snippet": "@ORM\\MappedSuperclass${1:(repositoryClass=\"${2:Namespace\\RepositoryClassName}\")}"
    },
    {
        "tag": "@ORM\\NamedNativeQuery",
        "snippet": "@ORM\\NamedNativeQuery(name=\"${1}\", query=\"${2:SQL query string}\"${3:, resultClass=\"${4}\"}${5:, resultSetMapping=\"${6}\"})"
    },
    {
        "tag": "@ORM\\OneToOne",
        "snippet": "@ORM\\OneToOne(targetEntity=\"${1:Namespace\\EntityClass}\"${2:, cascade={${3:\"persist\", }${4:\"remove\", }${5:\"merge\", }${6:\"detach\", }${7:\"refresh\", }${8:\"all\"}\\}}${9:, fetch=\"${10|LAZY,EAGER|}\"}${11:, orphanRemoval=${12|true,false|}}${13:, inversedBy=\"${14}\"})"
    },
    {
        "tag": "@ORM\\OneToMany",
        "snippet": "@ORM\\OneToMany(targetEntity=\"${1:Namespace\\EntityClass}\"${2:, cascade={${3:\"persist\", }${4:\"remove\", }${5:\"merge\", }${6:\"detach\", }${7:\"refresh\", }${8:\"all\"}\\}}${9:, orphanRemoval=${10|true,false|}}${11:, mappedBy=\"${12}\"}${13:, fetch=\"${14|LAZY,EXTRA_LAZY,EAGER|}\"}${15:, indexBy=\"${16}\"})"
    },
    {
        "tag": "@ORM\\OrderBy",
        "snippet": "@ORM\\OrderBy({\"${1:name}\"=\"${2|ASC,DESC|}\"})"
    },
    {
        "tag": "@ORM\\PostLoad",
        "snippet": "@ORM\\PostLoad"
    },
    {
        "tag": "@ORM\\PostPersist",
        "snippet": "@ORM\\PostPersist"
    },
    {
        "tag": "@ORM\\PostRemove",
        "snippet": "@ORM\\PostRemove"
    },
    {
        "tag": "@ORM\\PostUpdate",
        "snippet": "@ORM\\PostUpdate"
    },
    {
        "tag": "@ORM\\PrePersist",
        "snippet": "@ORM\\PrePersist"
    },
    {
        "tag": "@ORM\\PreRemove",
        "snippet": "@ORM\\PreRemove"
    },
    {
        "tag": "@ORM\\PreUpdate",
        "snippet": "@ORM\\PreUpdate"
    },
    {
        "tag": "@ORM\\SequenceGenerator",
        "snippet": "@ORM\\SequenceGenerator(sequenceName=\"${1:tablename_seq}\"${2:, allocationSize=${3:10}}${4:, initialValue=${5:1}})"
    },
    {
        "tag": "@ORM\\SqlResultSetMapping",
        "snippet": "@ORM\\SqlResultSetMapping(name=\"${1}\"${2:, entities={${3}\\}}${4:, columns={${5}\\}})"
    },
    {
        "tag": "@ORM\\Table",
        "snippet": "@ORM\\Table(name=\"${1:table_name}\"${2:, indexes={${3}\\}}${4:, uniqueConstraints={${5}\\}}${6:, schema=\"${7:schema_name}\"})"
    }
];