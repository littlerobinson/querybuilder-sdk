<?php
namespace Littlerobinson\QueryBuilder\Tests;

use Littlerobinson\QueryBuilder\DoctrineDatabase;
use Littlerobinson\QueryBuilder\QueryBuilderDoctrine;

class QueryBuilderDoctrineTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var DoctrineDatabase
     */
    private $db;

    /**
     * @var QueryBuilderDoctrine
     */
    private $qb;

    private $connection;


    public function setup()
    {
        $this->db         = new DoctrineDatabase();
        $this->connection = $this->db->getConnection();
        $this->qb         = new QueryBuilderDoctrine();
    }

    public Function testGoodJsonQuery()
    {
        $jsonQuery = file_get_contents(__DIR__ . '/Json/qb-good-syntax.json');
        $result    = $this->qb->executeQuery($jsonQuery);
        $this->assertInternalType('array', $result);
    }

    /**
     * @expectedException \Exception
     */
    public Function testBadFromJsonQuery()
    {
        $jsonQuery = file_get_contents(__DIR__ . '/Json/qb-bad-from-syntax.json');
        $result    = $this->qb->executeQuery($jsonQuery);
    }

    /**
     * @expectedException \Exception
     */
    public Function testBadSelectJsonQuery()
    {
        $jsonQuery = file_get_contents(__DIR__ . '/Json/qb-bad-select-syntax.json');
        $result    = $this->qb->executeQuery($jsonQuery);
    }

    /**
     * @expectedException \Exception
     */
    public Function testBadConditionJsonQuery()
    {
        $jsonQuery = file_get_contents(__DIR__ . '/Json/qb-bad-condition-syntax.json');
        $result    = $this->qb->executeQuery($jsonQuery);
        $this->expectException(\Exception::class);
    }

}